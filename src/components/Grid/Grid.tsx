import * as React from 'react';
import './Grid.css';
import { State } from '../../commons/types';
import Box from '../Box/Box';
import { getPlayerFromState, getStateFromPlayer } from '../../commons/utils';

interface IState {
    grid: State[];
    player: number;
    won: boolean;
}

interface IProps {
    sideSize: number;
    onPlayerChange: (player: number) => void;
    onWin: (player: number) => void;
}

class Grid extends React.Component<IProps, IState> {

    public state: IState = {
        // fill in the grid with empty boxes
        grid: Array(Math.pow(this.props.sideSize, 2)).fill(State.TIC),
        // first player is the 0
        player: 0,
        won: false,
    }

    constructor(props: IProps) {
        super(props);
        this.changeState = this.changeState.bind(this);
        // pass the first player information to the App container
        this.props.onPlayerChange(this.state.player);
    }

    public render() {
        return (
            <div className="grid">
                {this.renderGameGrid()}
            </div>
        );
    }

    private renderGameGrid() {
        return this.state.grid.map(
            (state, index) => (<Box key={index} index={index} state={state} onChangeState={this.changeState} />)
        );
    }

    // TODO: make it work for NxN grids
    private whoWon(): number {
        const grid = this.state.grid;
        for (let i = 0; i < 3; ++i) {
            // rows
            if (grid[i * 3] === grid[i * 3 + 1] && grid[i * 3] === grid[i * 3 + 2]) {
                return getPlayerFromState(grid[i * 3]);
            }
            // columns
            if (grid[i] === grid[i + 3] && grid[i] === grid[i + 6]) {
                return getPlayerFromState(grid[i]);
            }
        }
        // diags
        if ((grid[0] === grid[4] && grid[4] === grid[8]) || (grid[2] === grid[4] && grid[4] === grid[6])) {
            return getPlayerFromState(grid[4]);
        }
        return -1;
    }

    private changeState(index: number): void {
        const grid = this.state.grid;
        // Allow the move only if not already won and if the box has not already been checked
        if (!this.state.won && grid[index] === State.TIC) {
            // Fill the box with the player state
            grid[index] = getStateFromPlayer(this.state.player);
            // Find next player
            const player: number = 1 - this.state.player;
            // Refresh new grid and player
            this.setState({ grid, player });
            // Notify subscribers of player change
            this.props.onPlayerChange(player);
            // Check if the game is won
            const ww: number = this.whoWon();
            const won: boolean = ww >= 0;
            if (won) {
                // update state and notify subscribers
                this.setState({ won });
                this.props.onWin(ww);
            }
        }
    }

}

export default Grid;
