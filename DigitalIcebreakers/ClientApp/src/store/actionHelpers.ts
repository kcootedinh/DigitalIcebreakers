import { createAction, createReducer, CaseReducer, Action, ActionReducerMapBuilder } from '@reduxjs/toolkit';

import { GameMessage } from "../games/GameMessage";

export type InterfaceType = 'client' | 'presenter';

export type ActionWithPayload<T> = {
    payload: T;
} & Action<string>;

export const createGameAction = (gameName: string, interfaceType: InterfaceType, actionType: string) =>
    createAction(`${gameName}-${interfaceType}-${actionType}`);

export const createGameActionWithPayload = <T,>(gameName: string, interfaceType: InterfaceType, actionType: string) => 
    createAction<T>(`${gameName}-${interfaceType}-${actionType}`);

export const createGameMessageReceivedAction = <T,>(gameName: string, interfaceType: InterfaceType, actionType: string) =>
    createGameActionWithPayload<GameMessage<T>>(gameName, interfaceType, actionType);

export const createReceiveGameMessageReducer = <Payload, ReduxState = Payload>(
    gameName: string,
    initialState: ReduxState,
    caseReducer: CaseReducer<ReduxState, ActionWithPayload<GameMessage<Payload>>>,
    interfaceType: InterfaceType = "presenter",
    builderCallback?: (builder: ActionReducerMapBuilder<ReduxState>) => void
) => {
    const receiveGameMessage = createGameMessageReceivedAction<Payload>(gameName, interfaceType, "receive-game-message");
    return createReducer<ReduxState>(initialState, builder => {
        builder.addCase(receiveGameMessage, caseReducer);
        builderCallback && builderCallback(builder);
    })
}

export const createReceiveReducer = <ReduxState>(
    gameName: string,
    initialState: ReduxState,
    caseReducer: CaseReducer<ReduxState, ActionWithPayload<string>>,
    interfaceType: InterfaceType = "presenter",
    builderCallback?: (builder: ActionReducerMapBuilder<ReduxState>) => void
) => {
    const receiveGameMessage = createGameActionWithPayload<string>(gameName, interfaceType, "receive-game-message");
    return createReducer<ReduxState>(initialState, builder => {
        builder.addCase(receiveGameMessage, caseReducer);
        builderCallback && builderCallback(builder);
    })
}