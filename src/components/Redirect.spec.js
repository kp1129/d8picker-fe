import React from 'react';
import { shallow } from 'enzyme';
import Redirect from './Splash';


describe('Redirect', () => {
  it('should render correctly', () => {
    const component = shallow(<Redirect />);
  
    expect(component).toMatchSnapshot();
  });

  
});