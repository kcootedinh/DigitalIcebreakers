import React from 'react';
import { Button, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { BaseGame } from '../BaseGame';

const MAX_CHARACTERS = 50;

export class IdeaWallClient extends BaseGame {
    displayName = IdeaWallClient.name

    constructor(props, context) {
        super(props, context);

        this.state = {
            idea: ""
        };
    }

    onChange = (e) => {
        if (e.target.value.split('\n').length <= 4)
            this.setState({ idea: e.target.value });
    }

    onClick = (e) => {
        if (this.state.idea.length) {
            this.props.connection.invoke("gameMessage", `idea:${this.state.idea}`);
            this.setState({idea: ""});
        }
    }

    render() {
        const characters = this.state.idea.length;
        const style = characters >= MAX_CHARACTERS - 5 ? { color: "#D32F2F" } : {};
        return (
            <Form>
                <FormGroup>
                    <ControlLabel>Your idea <span style={style}>({characters}/{MAX_CHARACTERS})</span></ControlLabel>
                    <FormControl maxLength={MAX_CHARACTERS} componentClass="textarea" rows={3} onChange={this.onChange} value={this.state.idea} />
                </FormGroup>
                <Button onClick={this.onClick} bsStyle="primary" bsSize="large" style={{margin: "6px"}}>
                    Submit
                </Button>
            </Form>
        );
    }
}