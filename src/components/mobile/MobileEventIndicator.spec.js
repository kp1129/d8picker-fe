import React from 'react'
import dayjs from 'dayjs';
import Day from './MobileDay'
import EventsIndicator from './MobileEventIndicator'
import {shallow} from 'enzyme';



let events = [
  {
    summary: "test",
    start:{dateTime:"2020-04-25T13:00:00-04:00"}
  },
  {
    summary: "test2",
    start:{dateTime:"2020-04-25T13:00:00-04:00"}
  }
]

let eventNameArr = ["2020-04-25", "2020-04-25", "2020-04-28", "2020-04-29"]
let summaries = ["My Event", "Other Testing Event", "stuff and things", "party"]



let theDay = require('./MobileDay');
theDay.matchTheEvents = jest.fn((eventNameArr, currentYear, currentMonth, day, events, summaries)=>{
    return <EventsIndicator
    key={formattedDate}
    event={formattedDate}
    events={events}
    day={day}
    currentMonth={currentMonth}
    currentYear={currentYear}
    eventSummary={eventSummary}
    fontSize="2px"
  />
})

const handleSelected = jest.fn(()=>{})


describe('MobileEventsIndicator', ()=>{

    it('should render', ()=>{
        const wrapper = shallow(<Day key={0} i={0} isPicked={false} handleSelected={handleSelected} isToday={false} day={dayjs()} date={dayjs()} events={events} eventNameArr={eventNameArr} summaries={summaries}/>)
        let stuff = wrapper.find(EventsIndicator);
        console.log('events', stuff.debug())
    })





    // it('should render', ()=>{
    //     const wrapper = shallow(<EventsIndicator event={"2020-04-26"} eventSummary={"My Event"}/>)
    //     console.log('logging', wrapper.debug())
    // })
})