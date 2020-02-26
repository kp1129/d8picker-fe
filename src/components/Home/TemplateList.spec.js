import React from 'react';
import { shallow } from 'enzyme';
import TemplateList from './TemplateList';



describe('TemplateList', () => {
    it('should render correctly', () => {
      const component = shallow(<TemplateList />);
    
      expect(component).toMatchSnapshot();
    });
  
    
  });