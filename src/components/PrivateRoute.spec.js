import React from 'react';
import { shallow } from 'enzyme';
import PrivateRoute from './PrivateRoute';


describe('PrivateRoute', () => {
  it('should render correctly', () => {
    const component = shallow(<PrivateRoute />);
  
    expect(component).toMatchSnapshot();
  });

  
});