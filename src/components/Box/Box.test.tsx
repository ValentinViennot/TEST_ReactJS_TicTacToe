import * as React from 'react';
import * as enzyme from 'enzyme';

import Box from './Box';
import { State } from '../../commons/types';

it('renders without crashing', () => {
    const box = enzyme.shallow(<Box index={0} state={State.TIC} onChangeState={jest.fn()} />);
    expect(box.instance()).toBeInstanceOf(Box);
});

it('triggers onChangeState when is clicked', () => {
    const fn = jest.fn();
    const box = enzyme.shallow(<Box index={0} state={State.TIC} onChangeState={fn} />);
    box.simulate("click");
    expect(fn).toHaveBeenCalled();
});