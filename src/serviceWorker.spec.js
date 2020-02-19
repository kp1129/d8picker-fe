import React from 'react';
import { shallow } from 'enzyme';
import {register, registerValidSW,checkValidServiceWorker } from './serviceWorker';


describe('register', () => {
  it('should render correctly', () => {
    const component = shallow(<register />);
  
    expect(component).toMatchSnapshot();
  });

  
});

describe('registerValidSW', () => {
    it('should render correctly', () => {
      const component = shallow(<registerValidSW />);
    
      expect(component).toMatchSnapshot();
    });
  
    
  });


describe('checkValidServiceWorker', () => {
    it('should render correctly', () => {
      const component = shallow(<checkValidServiceWorker />);
    
      expect(component).toMatchSnapshot();
    });
  
    
  });


describe('unregister', () => {
    it('should render correctly', () => {
      const component = shallow(<unregister />);
    
      expect(component).toMatchSnapshot();
    });
  
    
  });