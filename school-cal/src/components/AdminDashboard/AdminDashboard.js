
import React, { useContext } from "react";
// full calendar
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick

// must manually import the stylesheets for each plugin
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

import { app } from "../../firebase";

//css
import './AdminDashboard.css'


export default class AdminDashBoard extends React.Component {
  calendarComponentRef = React.createRef();
  state = {
    calendarWeekends: true,
    calendarEvents: [
      //initial event data
      { title: "todays Event ", start: new Date() }
    ]
  };
  render(){
    return (
      <div className= 'full-calendar-admin' >
          <FullCalendar
            defaultView="dayGridMonth"
            header={{
              left:"prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
            }}
            plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
            selectable={true}
            events={this.state.calendarEvents}
            dateClick={this.handleDateClick}
          />
      </div>
    );
};
handleDateClick = arg => {
  this.setState({
    // add new event data
    calendarEvents: this.state.calendarEvents.concat({
      // creates a new array
      title: "New Event",
      start: arg.date,
      allDay: arg.allDay
    })
  })
}}

