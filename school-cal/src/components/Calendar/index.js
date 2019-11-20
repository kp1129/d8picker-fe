import React, { useContext, useEffect, useState } from "react"
import { CalendarContext } from "../../contexts/calendar/calendarState"
import { Button, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import AddIcon from "@material-ui/icons/Add"

import CreateEvent from "../Events/CreateEvent"
import EditEvent from "../Events/EditEvent"
import moment from "moment"

//fullcalendar
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin, { Draggable } from "@fullcalendar/interaction"
import "@fullcalendar/core/main.css"
import "@fullcalendar/daygrid/main.css"
import "@fullcalendar/timegrid/main.css"
import axios from "axios"

const useStyles = makeStyles(theme => ({
  headerContainer: {
    marginBottom: theme.spacing(3),
  },
  createButton: {
    backgroundColor: "#F5945B",
  },
  buttonLabel: {
    textTransform: "none",
  },
}))

const Calendar = props => {
  const classes = useStyles()
  const { userCalendarEvents, setUserCalendarEvent } = useContext(
    CalendarContext,
  )

  const [createEvent, openCreateEvent] = useState(false)
  const [editEvent, openEditEvent] = useState(false)

  const [events, setEvents] = useState([])

  useEffect(() => {
    if (userCalendarEvents.length > 0) {
      const formatted = userCalendarEvents.map(event => {
        return {
          id: event.id,
          start: event.startTime,
          end: event.endTime,
          title: event.eventTitle,
          location: event.eventLocation,
          note: event.eventNote,
          allDay: event.isAllDayEvent,
          backgroundColor: event.eventColor,
        }
      })
      setEvents(formatted)
    }
  }, [userCalendarEvents])

  const handleEventClick = info => {
    const { id, start, end, title, allDay, extendedProps } = info.event
    openEditEvent(true)
    setUserCalendarEvent({
      startTime: moment(start).toISOString(),
      endTime: moment(end).toISOString(),
      eventTitle: title,
      isAllDayEvent: allDay,
      eventNote: extendedProps.note,
      eventLocation: extendedProps.location,
      uuid: id,
    })
  }
  function eventDrop(info) {
    const { id } = info.event
    const eventOject = {
      startDate: info.event.start,
      endDate: info.event.end,
      startTime: info.event.start,
      endTime: info.event.end,
    }
    axios
      .put(`http://localhost:4000/api/calendars/events/${id}`, eventOject)
      .then(res => {
        console.log("put is being parsed", res.data)
        setEvents({
          ...userCalendarEvents,
          startDate: res.data.start,
          endDate: res.data.end,
        })
      })
      .catch(err => {
        console.log("unable to update", err)
      })
  }
  return (
    <div>
      <Grid container className={classes.headerContainer}>
        <Grid item xs={12}>
          <Button
            classes={{
              root: classes.createButton,
              label: classes.buttonLabel,
            }}
            startIcon={<AddIcon />}
            onClick={() => openCreateEvent(true)}>
            Create Event
          </Button>
        </Grid>
      </Grid>
      <FullCalendar
        defaultView="dayGridMonth"
        header={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth, timeGridWeek, timeGridDay, listWeek",
        }}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        editable={true}
        droppable={true}
        // drop={drop(title, date)} //fires function
        eventDrop={eventDrop}
        selectable={true}
        events={events}
        // eventReceive={receive()}
        eventClick={handleEventClick}
      />
      <CreateEvent
        open={createEvent}
        handleClose={() => openCreateEvent(false)}
      />
      <EditEvent open={editEvent} handleClose={() => openEditEvent(false)} />
    </div>
  )
}

export default Calendar
