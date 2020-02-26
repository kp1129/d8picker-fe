import React from 'react';
import { shallow } from 'enzyme';
import index from './index';



describe('index', () => {
    it('should render correctly', () => {
      const component = shallow(<index />);
    
      expect(component).toMatchSnapshot();
    });
  
    
  });