import React, { useState, useEffect } from "react";
import axios from 'axios'
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

import Loading from '../loadingScreen/loading.js'
import moment from 'moment'

const Cells = props => {
  const [data, setData] = useState({events:[{}]});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    (async () => {
      const res = await axios.get("/api/events");
      const results = await res.data;
      localStorage.setItem("googleId:", res.data.googleId)
      console.log("results: ", results);
      setData(results);
      setLoading(true);
    })();
  }, [setData]);
  
  console.log("andrew data:",data)
  const onDateClick = day => {
    setSelectedDate(day);
  };
  if(loading){
  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, dateFormat);
      let eventDate = moment(day).format('YYYYMMDD')
      const cloneDay = day;
      let eventDescription = data.events[i]
      let eventData = data.events[i - 1].start.dateTime
      console.log('single events',data.events[i])
      console.log("formated date :", moment(eventData).format('YYYYMMDD'))
      console.log("regular day :", eventDate)
      
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
        {}
          <span className = "events">{eventDate === moment(eventData).format('YYYYMMDD')? data.events[i].description : null}</span>
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
      </div>
    );
    days = [];
  }
}
  return <div className="body">{!loading ? <Loading/> : rows}
  {/* <ul>
          {data &&
            data.events.map(event => (
              <li key={event.id}>
                <p>
                  {event.start.dateTime}
                  <strong> - {event.summary}</strong>
                </p>
              </li>
            ))}
        </ul> */}
        
  </div>;
};
export default Cells;