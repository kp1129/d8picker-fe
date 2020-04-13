import React from 'react';
import { shallow } from 'enzyme';
import App, {initializeAnalytics} from './App';
import Welcome from './components/Welcome'

// Grab the module that we want to mock part of
var auth = require('./contexts/auth');

// Replace the real useAuth() function with a mock function we can control
auth.useAuth = jest.fn(
  () => {
    console.log("*** Mock useAuth **")

    return { googleApi: jest.fn() }
  });

describe('Initializing Components', () => {
  it('should render initializeAnalytics', () => {
    const component = shallow(<initializeAnalytics />);

    expect(component).toMatchSnapshot();
  });

  it('should render App correctly', () => {
    const component = shallow(<App />);

    expect(component).toMatchSnapshot();
  });

  it('should render Welcome correctly', () => {
    const welcome = shallow(<Welcome />);
    let signin = welcome.find('span.signin');
    console.log(signin);
    // expect(welcome.find('span.signin').text()).to.be.equal('Sign in with Google')

    // expect(component).toMatchSnapshot();
  });


});