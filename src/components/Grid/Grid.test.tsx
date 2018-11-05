import * as React from 'react';
import * as enzyme from 'enzyme';

import Grid from './Grid';

it('renders without crashing', () => {
    const grid = enzyme.shallow(<Grid sideSize={9} onPlayerChange={jest.fn()} onWin={jest.fn()} />);
    expect(grid.instance()).toBeInstanceOf(Grid);
});

it('calls onPlayerChange on click on an empty box', () => {
    // TODO 
});


it('calls onWin only if won!', () => {
    // TODO 
});