import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import Layout from './components/Layout';
import { LobbySwitch } from './components/Lobby';
import { LobbyClosed } from './components/LobbyClosed';
import { NewGame } from './components/NewGame';
import { Game } from './components/Game';
import { CreateLobby } from './components/CreateLobby';
import { CloseLobby } from './components/CloseLobby';
import { Join } from './components/Join';
import { HubConnectionBuilder, HubConnection } from '@microsoft/signalr';
import { guid } from './util/guid';
import history from './history';
import ReactAI from './app-insights-deprecated';
import { Events } from './Events';
import * as Version from './version.json';
import { ConnectionStatus } from './ConnectionStatus';
import { SignalR } from './games/BaseGame'
import { Provider } from 'react-redux'
import { configureAppStore } from './store/configureAppStore'
import { EnhancedStore, AnyAction } from '@reduxjs/toolkit';
import { RootState } from './store/RootState';
import { setConnectionStatus } from './store/connection/actions';

const connectionRetrySeconds = [0, 1, 4, 9, 16, 25, 36, 49];

type AppState = {
    user: User;
    lobby?: AppLobby,
    players: User[],
    menuItems: JSX.Element[],
    currentGame?: string,
    isAdmin: boolean
}

type User = {
    id: string;
    name: string;
}

type AppLobby = {
    name: string,
    id: string
}

export default class App extends Component<{}, AppState> {
    displayName = App.name
    private isDebug = false;
    private myStorage: Storage;
    private connectionTimeout = 0;
    private user: User;
    private connection!: HubConnection;
    private connectionStarted?: Date;
    store: EnhancedStore<RootState, AnyAction>;

    constructor(props: any, context: any) {
        super(props, context);

        this.isDebug = true;

        this.myStorage = window.localStorage;

        this.user = this.getUser();

        this.state = {
            user: this.user,
            isAdmin: false,
            menuItems: [],
            players: []
        };

        this.store = configureAppStore();

        ReactAI.setAppContext({ userId: this.user.id });

        this.configureSignalR();

        window.onresize = () => Events.emit('onresize');
    }

    private get signalR(): SignalR {
        return {
            clientMessage: (message: any) => {
                const payload = JSON.stringify({ client: message });
                this.connection.invoke("hubMessage", payload);
            },
            adminMessage: (message: any) => {
                const payload = JSON.stringify({ admin: message });
                this.connection.invoke("hubMessage", payload);
            }
        }
    }

    private getUser() {
        if (this.myStorage) {
            const raw = this.myStorage.getItem("user");
            if (raw) {
                const user = JSON.parse(raw);
                console.log("User retrieved", user);
                return user;
            }
        }

        const user = { id: guid() };
        if (this.myStorage)
            this.myStorage.setItem("user", JSON.stringify(this.user));

        return user;
    }

    debug(...a: any[]) {
        if (this.isDebug)
            console.log('[app]', ...a);
    }

    getDuration(from: Date, to: Date = new Date()) {
        return to.valueOf() - from.valueOf();
    }

    configureSignalR() {
        this.connection = new HubConnectionBuilder()
            .withUrl("/gameHub")
            .build();
        this.connection.keepAliveIntervalInMilliseconds = 2000;
        const component = this;

        this.connection.on("reconnect", (response) => {
            this.debug("reconnect", response);
            
            ReactAI.ai().trackMetric("userReconnected", this.getDuration(this.connectionStarted!));
            this.store.dispatch(setConnectionStatus(ConnectionStatus.Connected));
            let user = this.user;
            if (response.playerId) {
                user = {
                    id: response.playerId,
                    name: response.playerName
                };
            }
            
            this.setState({
                lobby: {
                    id: response.lobbyId,
                    name: response.lobbyName,
                },
                isAdmin: response.isAdmin,
                players: response.players,
                currentGame: response.currentGame,
                user: user
            }, () => {
                if (this.myStorage)
                    this.myStorage.setItem("user", JSON.stringify(this.state.user));

                this.goToDefaultLocation();
            });
        });

        this.connection.onclose(() => {
            this.debug("connection closed");
            ReactAI.ai().trackEvent("Connection closed");
            this.store.dispatch(setConnectionStatus(ConnectionStatus.NotConnected));
            this.connect();
        });

        this.connection.on("closelobby", () => {
            this.debug("lobby closed");
            ReactAI.ai().trackEvent("Lobby closed");
            this.setState({ lobby: undefined });
            history.push('/lobbyClosed');
        });

        this.connection.on("connected", () => {
            this.debug("connected");
            ReactAI.ai().trackMetric("userConnected", this.getDuration(this.connectionStarted!));
            this.store.dispatch(setConnectionStatus(ConnectionStatus.Connected));
        });

        this.connection.on("joined", (user) => {
            component.setState(prevState => ({
                players: [...prevState.players, user]
            }));
            console.log('joined', user);
        });

        this.connection.on("left", (user) => {
            component.setState(prevState => ({
                players: prevState.players.filter(p => p.id !== user.id)
            }));

            this.debug("left", user);
        });

        this.connection.on("newGame", (name) => {
            this.debug("newGame", name);
            ReactAI.ai().trackEvent("Joining new game");
            this.connection.off("gameUpdate");
            this.setState({ currentGame: name }, () => {
                history.push(`/game/${name}`);
            });
            
        });

        this.connection.on("endGame", () => {
            this.debug("endGame");
            ReactAI.ai().trackEvent("Game ended");
        });

        this.connect();
    }

    goToDefaultLocation() {
        if (this.state.currentGame)
            history.push(`/game/${this.state.currentGame}`);
        else
            history.push("/");
    }

    bumpConnectionTimeout() {
        this.connectionTimeout = connectionRetrySeconds.filter(s => s > this.connectionTimeout)[0];
        if (!this.connectionTimeout)
            this.connectionTimeout = connectionRetrySeconds[connectionRetrySeconds.length-1];
    }

    getCurrentLocation() {
        return history.location || window.location;
    }

    currentLocationIsJoin() {
        return this.getCurrentLocation().pathname.startsWith("/join/");
    }

    connect() {
        let lobbyId:string|undefined = undefined;
        if (this.currentLocationIsJoin()) {
            lobbyId = this.getCurrentLocation().pathname.substr(6);
        }

        setTimeout(() => {
            if (this.store.getState().connection.status > 0)
                return;
            this.bumpConnectionTimeout();
            this.connectionStarted = new Date();
            this.store.dispatch(setConnectionStatus(ConnectionStatus.Pending));
            this.connection.start()
           .then(() => {
               this.connectionTimeout = 0;
               ReactAI.ai().trackMetric("connected", this.getDuration(this.connectionStarted!));
               this.connection.invoke("connect", this.user, lobbyId).catch(() => {
                   this.connect();
               });
           })
           .catch((err) => {
            this.store.dispatch(setConnectionStatus(ConnectionStatus.NotConnected));
               this.connect();
               return console.error(err.toString());
           });
        }, this.connectionTimeout * 1000);
    }

    joinLobby = (id: string, name: string) => {
        this.user.name = name;
        this.connection.invoke("connectToLobby", this.user,  id);
    }

    closeLobby = () => {
        this.connection.invoke("closelobby");
    }

    createLobby = (name: string) => {
        this.connection.invoke("createLobby", guid(), name, this.state.user)
            .catch((err) => console.log(err));
    }

    newGame = (name: string) => {
        this.setMenuItems([]);
        this.connection.invoke("newGame", name);
    }

    endGame = () => {
        this.connection.invoke("endGame");
    }

    redirect(condition: boolean, component: any) {
        if (condition)
            return component;
        else
            return () => <Redirect to="/" />
    }

    setMenuItems = (items: JSX.Element[]) => {
        this.setState({menuItems: items});
    }

    render() {
        var connected = this.store.getState().connection.status === ConnectionStatus.Connected;
        var game = this.redirect(connected, (props:any) => <Game isAdmin={this.state.isAdmin} setMenuItems={this.setMenuItems} signalR={this.signalR} connection={this.connection} {...props} players={this.state.players} />);
        var newGame = this.redirect(connected, () => <NewGame newGame={this.newGame} />);
        var closeLobby = this.redirect(connected, () => <CloseLobby closeLobby={this.closeLobby} />);

        return (
            <Provider store={this.store}>
                <Layout menuItems={this.state.menuItems} currentGame={this.state.currentGame} isAdmin={this.state.isAdmin} version={Version.version} lobbyId={this.state.lobby && this.state.lobby.id}>
                    <Route exact path='/' render={() => <LobbySwitch lobby={this.state.lobby} players={this.state.players} /> } />
                    <Route path='/createLobby' render={() => <CreateLobby createLobby={this.createLobby} /> } />
                    <Route path='/closeLobby' render={closeLobby }  />
                    <Route path='/lobbyClosed' component={LobbyClosed} />
                    <Route path='/game/:name' render={game} />
                    <Route path='/newGame' render={newGame} />
                    <Route path='/join/:id' render={props => <Join join={this.joinLobby} {...props} /> }  />
                </Layout>
            </Provider>
        );
    }
}
