import * as React from 'react';
import './Header.css';
import { getClassNameFromPlayer } from 'src/commons/utils';

interface IProps {
    player: number;
    won: boolean;
}

const Header: React.SFC<IProps> = (props: IProps) => (
    <div className={"header " + getClassNameFromPlayer(props.player) + (props.won ? " won" : "")} >
        {props.won ? "Player " + (props.player + 1) + " won!" : "Player " + (props.player + 1)}
    </div>
);

export default Header;