import React from 'react';
import { shallow } from 'enzyme';
import App, {initializeAnalytics} from './App';

// Grab the module that we want to mock part of
var auth = require('./contexts/auth');

// Replace the real useAuth() function with a mock function we can control
auth.useAuth = jest.fn(
  () => {
    console.log("*** Mock useAuth **")

    return { googleApi: jest.fn() }
  });

describe('initializeAnalytics', () => {
  it('should render correctly', () => {
    const component = shallow(<initializeAnalytics />);

    expect(component).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const component = shallow(<App />);

    expect(component).toMatchSnapshot();
  });
});