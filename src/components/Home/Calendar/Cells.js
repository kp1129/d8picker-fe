import React, { useState, useEffect } from "react";
import DayPlanner from "./DayPlanner";
import {gapi} from 'gapi-script'
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  parse,
  addDays
} from "date-fns";
 // Client ID and API key from the Developer Console
 let CALENDAR_ID = '748930572718-oukct2b8df9ga1krq2cl65hgihd74o3o.apps.googleusercontent.com';
 let API_KEY = 'AIzaSyB1kjBjvL6tOz41u8B1lPAewrX0Ag2xf80';
const Cells = props => {
  const [events, setevents] = useState([])
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const monthStart = startOfMonth(props.currDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const dateFormat = "d";
  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = "";
useEffect(()=>{
  getEvents()
},[])
 function getEvents(){
    let that = this;
    function start() {
      gapi.client.init({
        'apiKey': API_KEY
      }).then(function() {
        return gapi.client.request({
          'path': `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events`,
        })
      }).then( (response) => {
        let event = response.result.items
        setevents({
          event
        }, ()=>{
          console.log("my events :",events)
        })
      }, function(reason) {
        console.log(reason);
      });
    }
    gapi.load('client', start)
  }
  const onDateClick = day => {
    setSelectedDate(day);
  };
  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, dateFormat);
      const cloneDay = day;
      days.push(
        <div
          className={`column cell ${
            !isSameMonth(day, monthStart)
              ? "disabled"
              : isSameDay(day, selectedDate)
              ? "selected"
              : ""
          }`}
          key={day}
          onClick={() => {
            onDateClick(parse("", "", cloneDay));
            toggle();
          }}
        >
          <span className="number">{formattedDate}</span>
          <span className="bg">{formattedDate}</span>
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className="row" key={day}>
        {" "}
        {days} 
        <DayPlanner toggler={toggle} modals={modal}  date = {format(selectedDate, 'MMMM d yyyy')}/>
      </div>
    );
    days = [];
  }
  let myEvents = []
  events.map(e=>myEvents.push(events))
  return <div className="body">{rows}
  </div>;
};
export default Cells;