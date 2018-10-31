import * as React from 'react';
import './App.css';
import { State } from './types';
import Case from './Case';

interface IState {
  grid: State[];
  player: number;
}

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
        <header>
          Player {this.state.player + 1}
        </header>
        <div className="grid">
          {this.renderGameGrid()}
        </div>
      </>
    );
  }

  private renderGameGrid() {
    return this.state.grid.map(
      (state, index) => (<Case key={index} state={state} onChangeState={this.changeState} />)
    );
  }

  private changeState(index: number) {
    const grid = this.state.grid;
    grid[index] = this.state.player === 1 ? State.TAC : State.TOE;
    this.setState({ grid, player: 1 - this.state.player });
  }

}

export default App;