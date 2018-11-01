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
    return ww >= 0 ? (
      <header>
        Player {ww + 1} won!
      </header>
    ) : (
        <header>
          Player {this.state.player + 1}
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
      // test rows
      let j = i * 3;
      let upper = i * 3 + 3;
      let player: State = grid[j];
      for (j = j + 1; j < upper; ++j) {
        if (grid[j] !== player) break;
      }
      if (j === upper)
        return players.indexOf(grid[i * 3]);
      // test columns
      upper = 3 * 3;
      player = grid[i];
      for (j = 3; j < upper; j += 3) {
        if (grid[i + j] !== player) break;
      }
      if (j === upper)
        return players.indexOf(grid[i]);
    }
    // columns
    // diag
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
