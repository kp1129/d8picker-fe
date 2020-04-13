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
    const welcome = render(<Welcome />);
    let signin = <span className="signin">Sign in with Google</span>

    expect(welcome.contains(signin)).toEqual(true);
   
  });


});