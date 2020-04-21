import React from 'react'
import dayjs from 'dayjs';
import Day from './day';
import EventsIndicator from './EventsIndicator'
import { shallow} from 'enzyme';


let eventList = [
  {
    summary: "test",
    start:{dateTime:"2020-04-16T13:00:00-04:00"}
  },
  {
    summary: "test2",
    start:{dateTime:"2020-04-17T13:00:00-04:00"}
  }
]

describe('events', ()=>{
  it('should display the correct number of EventIndicator', ()=>{
    const wrapper = shallow(<Day date={dayjs()} selected={[]} events={eventList}/>)


    let events = wrapper.find(EventsIndicator);
    expect(events).toHaveLength(2);


  })
})