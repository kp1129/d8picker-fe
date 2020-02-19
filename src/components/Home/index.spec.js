import React from 'react';
import { shallow } from 'enzyme';
import Home from './index';
import { create, renderer } from 'react-test-renderer';
import axios from 'axios';
import * as rtl from '@testing-library/react';
import ReactDOM from 'react-dom';
import {render} from '@testing-library/react';


jest.mock('axios');


describe('Home', () => {
  
  it('renders without crashing', () => {
    const div = document.createElement('div');
    rtl.render(Home, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  
  it('should call data', () => { 
  function fetchData(callback){
    setTimeout(() => {
      callback(data);
    }, 500);
  }
});


it('should match snapshot', () => {
  expect(render(<Home/>)).toMatchSnapshot();
});

it('renders the calendar', () => {
  const { getByText } =  render(Home);
   getByText(/Calendar/i);
});






})
