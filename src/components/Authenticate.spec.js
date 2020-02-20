import React from 'react';
import { shallow } from 'enzyme';
import Authenticate from './Authenticate';

describe('Authenticate', () => {
  it('should render correctly', () => {
    const component = shallow(<Authenticate />);

    expect(component).toMatchSnapshot();
  });
});
