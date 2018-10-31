import * as React from 'react';
import * as enzyme from 'enzyme';

import App from './App';

it('renders the grid without crashing', () => {
  const app = enzyme.shallow(<App />);
  expect(app.find(".grid").children().length).toEqual(9);
});

it('change state when I click a Case', () => {

});
