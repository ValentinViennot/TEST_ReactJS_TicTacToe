import * as React from 'react';
import './Box.css';
import { State } from './types';

interface IProps {
    index: number;
    state: State;
    onChangeState: any;
}

class Box extends React.Component<IProps, {}> {

    constructor(props: IProps) {
        super(props);
        this.handleChangeState = this.handleChangeState.bind(this);
    }

    public render() {
        return (
            <div onClick={this.handleChangeState} className={"case " + this.getClassName(this.props.state)} />
        );
    }

    private handleChangeState() {
        this.props.onChangeState(this.props.index);
    }

    private getClassName(state: State) {
        switch (state) {
            case State.TIC:
                return "tic";
            case State.TAC:
                return "tac";
            default:
                return "toe";
        }
    }

}

export default Box;