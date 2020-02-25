import React from 'react';
import { shallow } from 'enzyme';
import Calendar, {button} from './Calendar';
import { create, renderer } from "react-test-renderer";

describe('Calendar', () => {
const wrapper = shallow(<Calendar />)

  it('should render correctly', () => {
    const component = shallow(<Calendar />);
    expect(Calendar).toMatchSnapshot();
  });

  it('should render days-of-the-week labels', () => {
    const strings = ['Sun', 'Mon','Tues','Wed', 'Thu','Fri', 'Sat'];
    const component = shallow(<Calendar list={strings} />);
    expect(component).toMatchSnapshot();
  });

  it('should have a btn component', ()=> {
    expect(wrapper.find('button')).toHaveLength(2);
    // expect(wrapper.find('button')
    // .toEqual('button'))
    expect('button').toBeDefined()
  });
  

});
  
