import * as React from 'react';
import './Box.css';
import { State } from '../commons/types';
import { getClassNameFromState } from '../commons/utils';

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
            <div onClick={this.handleChangeState} className={"case " + getClassNameFromState(this.props.state)} />
        );
    }

    private handleChangeState() {
        this.props.onChangeState(this.props.index);
    }

}

export default Box;