import React from 'react';
import { shallow } from 'enzyme';
import Template from './Template';


describe('Template', () => {
  it('should render correctly', () => {
    const component = shallow(<Template />);
  
    expect(component).toMatchSnapshot();
  });

  
});