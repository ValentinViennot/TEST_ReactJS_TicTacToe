import * as React from 'react';
import './App.css';
import Grid from './components/Grid/Grid';
import Header from './components/Header/Header';

const SIDE_SIZE: number = 3;

interface IState {
  player: number;
  won: boolean;
}

// TODO: Add reset button
class App extends React.Component<{}, IState> {

  public state: IState = {
    player: 0,
    won: false,
  }

  constructor(props: {}) {
    super(props);
    this.handlePlayerChange = this.handlePlayerChange.bind(this);
    this.onWin = this.onWin.bind(this);
  }

  public render() {
    return (
      <>
        <Header player={this.state.player} won={this.state.won} />
        <Grid onWin={this.onWin} onPlayerChange={this.handlePlayerChange} sideSize={SIDE_SIZE} />
      </>
    );
  }

  private handlePlayerChange(player: number) {
    this.setState({ player });
  }

  private onWin(player: number) {
    this.setState({
      won: true,
      player
    });
  }

}

export default App;
