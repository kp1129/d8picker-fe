import React, { useContext } from "react"
// full calendar
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick

// must manually import the stylesheets for each plugin
import "@fullcalendar/core/main.css"
import "@fullcalendar/daygrid/main.css"
import "@fullcalendar/timegrid/main.css"

import { app, db } from "../../config/firebase"

//css
import "./AdminDashboard.css"
import Button from "@material-ui/core/Button"
import { AuthContext } from "../../contexts/auth/authState"
import AdminAddEvent from "./AdminAddEvent"

//setting state
const eventData = [
  {
    title: "todays events! lets get it done",
    start: new Date(),
  },
]

export default class AdminDashBoard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      events: eventData,
    }
  }

  dateClick = dateStr => {
    console.log("date was clicked", this.state.start)
    this.setState({
      events: [
        ...this.state.events,
        {
          start: dateStr,
        },
      ],
    })
  }

  addEvent = (title, start) => {
    const newEvents = [...this.state.events]
    newEvents.push({
      title: title,
      start: start,
      id: Date.now(),
    })

    this.setState({
      events: newEvents,
    })
  }

  render() {
    console.log(this.state)
    return (
      <div className="full-calendar-admin">

        <FullCalendar
          defaultView="dayGridMonth"
          header={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
          }}
          unselectAuto={false}
          unselectCancel={false}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          navLinks={true} //can click day/week names to navigate views
          selectable={true} // can highlight multiple days, by clicking and dragging
          events={this.state.events} //adds events from state
          dateClick={this.dateClick} //click on date to add event
          // minTime={"07:00:00"}
          // maxTime={'18:00:00'}
          height={700}
          // aspectRatio={3}
          //https://fullcalendar.io/docs#toc This Links to all the props in fullcalendar io
          
        />
        <AdminAddEvent
          addEvent={this.addEvent}
          // handleDateClick={this.handleDateClick}
        />
      </div>
    )
  }
}
