import * as React from 'react';
import * as enzyme from 'enzyme';
import Box from './Box';

import App from './App';
import { State } from './types';

it('renders the grid without crashing', () => {
  const app = enzyme.shallow(<App />);
  expect(app.instance()).toBeInstanceOf(App);
  expect(app.find(".grid").children().length).toEqual(9);
});

it('game grid to be empty (TIC) at the beginning', () => {
  const app: App = enzyme.shallow(<App />).instance() as unknown as App;
  expect(app.state).toHaveProperty('grid');
  expect(app.state.grid.every((c) => c === State.TIC)).toBe(true);
});

it('a click on a box to call the related callback', () => {
  const handleTest = jest.fn(() => "");
  const b = enzyme.shallow(<Box index={0} state={State.TIC} onChangeState={handleTest} />);
  b.simulate("click");
  expect(handleTest).toHaveBeenCalled();
});

it('a click on an empty (TIC) box to change its state to not empty', () => {
  const a = enzyme.mount(<App />);
  expect(a.state()).toEqual({ "grid": [0, 0, 0, 0, 0, 0, 0, 0, 0], "player": 0 });
  a.find(".grid").children().forEach(b => {
    b.simulate("click");
  });
  const app = a.update().instance() as unknown as App;
  expect(app.state).toHaveProperty('grid');
  expect(app.state.grid.every((c) => c !== State.TIC)).toBe(true);
});

it('a click on a not empty box not to change App\'s state', () => {
  const a = enzyme.mount(<App />);
  expect(a.state()).toEqual({ "grid": [0, 0, 0, 0, 0, 0, 0, 0, 0], "player": 0 });
  a.find(".grid").childAt(0).simulate("click");
  expect(a.update().state()).toEqual({ "grid": [1, 0, 0, 0, 0, 0, 0, 0, 0], "player": 1 });
  a.find(".grid").childAt(0).simulate("click");
  expect(a.update().state()).toEqual({ "grid": [1, 0, 0, 0, 0, 0, 0, 0, 0], "player": 1 });
});


it('a victory to end the game and tell whos the winner (line)', () => {
  const a = enzyme.mount(<App />);
  expect(a.state()).toEqual({ "grid": [0, 0, 0, 0, 0, 0, 0, 0, 0], "player": 0 });
  // player 1
  a.find(".grid").childAt(0).simulate("click");
  // player 2
  a.update().find(".grid").childAt(3).simulate("click");
  // player 1
  a.update().find(".grid").childAt(1).simulate("click");
  // player 2
  a.update().find(".grid").childAt(4).simulate("click");
  // player 1
  a.update().find(".grid").childAt(2).simulate("click");
  // end
  expect(a.update().state()).toEqual({ "grid": [1, 1, 1, 2, 2, 0, 0, 0, 0], "player": 1 });
  expect(a.find("header").html()).toEqual("<header>Player 1 won!</header>");
});

it('a victory to end the game and tell whos the winner (column)', () => {
  const a = enzyme.mount(<App />);
  expect(a.state()).toEqual({ "grid": [0, 0, 0, 0, 0, 0, 0, 0, 0], "player": 0 });
  // player 1
  a.find(".grid").childAt(0).simulate("click");
  // player 2
  a.update().find(".grid").childAt(1).simulate("click");
  // player 1
  a.update().find(".grid").childAt(3).simulate("click");
  // player 2
  a.update().find(".grid").childAt(2).simulate("click");
  // player 1
  a.update().find(".grid").childAt(6).simulate("click");
  // end
  expect(a.update().state()).toEqual({ "grid": [1, 2, 2, 1, 0, 0, 1, 0, 0], "player": 1 });
  expect(a.find("header").html()).toEqual("<header>Player 1 won!</header>");
});


