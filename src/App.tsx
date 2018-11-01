import * as React from 'react';
import './App.css';
import { State } from './types';
import Box from './Box';

interface IState {
  grid: State[];
  player: number;
}

const players: State[] = [State.TAC, State.TOE];

class App extends React.Component<{}, IState> {

  public state: IState = {
    grid: Array(9).fill(State.TIC),
    player: 0,
  }

  constructor(props: {}) {
    super(props);
    this.changeState = this.changeState.bind(this);
  }

  public render() {
    return (
      <>
        {this.renderHeader()}
        <div className="grid">
          {this.renderGameGrid()}
        </div>
      </>
    );
  }

  private renderHeader() {
    const ww = this.whoWon();
    return ww < 0 ? (
      <header>
        Player {this.state.player + 1}
      </header>
    ) : (
        <header>
          <b>Player {ww + 1} won!</b>
        </header>
      );
  }

  private renderGameGrid() {
    return this.state.grid.map(
      (state, index) => (<Box key={index} index={index} state={state} onChangeState={this.changeState} />)
    );
  }

  private whoWon(): number {
    const grid = this.state.grid;
    for (let i = 0; i < 3; ++i) {
      // rows
      if (grid[i * 3] === grid[i * 3 + 1] && grid[i * 3] === grid[i * 3 + 2]) {
        return players.indexOf(grid[i * 3]);
      }
      // columns
      if (grid[i] === grid[i + 3] && grid[i] === grid[i + 6]) {
        return players.indexOf(grid[i]);
      }
    }
    // diags
    if ((grid[0] === grid[4] && grid[4] === grid[8]) || (grid[2] === grid[4] && grid[4] === grid[6])) {
      return players.indexOf(grid[4]);
    }
    return -1;
  }

  private changeState(index: number) {
    const grid = this.state.grid;
    if (grid[index] === State.TIC) {
      grid[index] = players[this.state.player];
      this.setState({ grid, player: 1 - this.state.player });
    }
    return null;
  }

}

export default App;
