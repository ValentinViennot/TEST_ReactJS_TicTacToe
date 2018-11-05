import * as React from 'react';
import * as enzyme from 'enzyme';

import Header from './Header';

it('renders without crashing', () => {
    enzyme.shallow(<Header player={0} won={false} />);
});

it('shows the player who have to play if not won', () => {
    const header = enzyme.shallow(<Header player={0} won={false} />);
    expect(header.html()).toMatch("Player 1");
});

it('shows the player who won if game is over', () => {
    const header = enzyme.shallow(<Header player={0} won={true} />);
    expect(header.html()).toMatch("Player 1 won!");
});