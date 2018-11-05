import * as React from 'react';
import * as enzyme from 'enzyme';

import App from './App';

it('renders the app without crashing', () => {
    const app = enzyme.shallow(<App />);
    expect(app.instance()).toBeInstanceOf(App);
});

it('has a state of {player:0, won:false} at the beginning', () => {
    const app = enzyme.mount(<App />);
    expect(app.update().state()).toEqual({ player: 0, won: false });
});

it('has a state of {player:1, won:false} after a first click on a box', () => {
    const app = enzyme.mount(<App />);
    app.find(".grid").childAt(0).simulate("click");
    expect(app.update().state()).toEqual({ player: 1, won: false });
});

it('has a state of {player:0, won:true} after the player 1 won', () => {
    const app = enzyme.mount(<App />);
    app.find(".grid").childAt(0).simulate("click");
    app.find(".grid").childAt(3).simulate("click");
    app.find(".grid").childAt(1).simulate("click");
    app.find(".grid").childAt(4).simulate("click");
    app.find(".grid").childAt(2).simulate("click");
    expect(app.update().state()).toEqual({ player: 0, won: true });
});