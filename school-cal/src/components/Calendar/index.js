import React, { useContext, useEffect, useState } from "react"
import moment from "moment" //date formatter

import { CalendarContext } from "../../contexts/calendar/calendarState"

//full calendar
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"

//setting styles
import { Button, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import AddIcon from "@material-ui/icons/Add"

//adding components
import CreateEvent from "../Events/CreateEvent"
import AddSubscribers from "../Events/addSubscriber"
import ViewDialog from "../Events/ViewDialog"

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
    marginRight: theme.spacing(3),
  },
  buttonLabel: {
    textTransform: "none",
  },
}))

const Calendar = props => {
  const classes = useStyles()
  const {
    userCalendarEvents,
    setUserCalendarEvent,
    editUserCalendarEvent,
  } = useContext(CalendarContext)

  const [createEvent, openCreateEvent] = useState(false)
  const [isAddSubscriberOpen, setAddSubscribers] = useState(false)
  const [events, setEvents] = useState([])

  const [viewDialog, setViewDialog] = useState([]) //onclick event view dialog share or edit
  const [openModal, openViewModal] = useState(false) //trigger for dialog view

  const initialCreateEventProperty = {
    startTime: moment()
      .hours(6)
      .minutes(0)
      .seconds(0),
    endTime: moment()
      .hours(7)
      .minutes(0)
      .seconds(0),
    eventTitle: "",
    eventLocation: "",
    eventNote: "",
    isAllDayEvent: false,
  }
  useEffect(() => {
    if (userCalendarEvents.length > 0) {
      const formatted = userCalendarEvents.map(event => {
        return {
          id: event.uuid,
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
    } else {
      setEvents([])
    }
  }, [userCalendarEvents])

  useEffect(() => {
    if (subscribedCalendars.length > 0) {
      const formatted = subscribedCalendars.map(calendar => {
        if (calendar.events && calendar.events.length > 0) {
          return {
            events: calendar.events.map(event => {
              return {
                id: event.uuid,
                start: event.isAllDayEvent ? event.startDate : event.startTime,
                end: event.isAllDayEvent ? event.endDate : event.endTime,
                title: event.eventTitle,
                location: event.eventLocation,
                note: event.eventNote,
                allDay: event.isAllDayEvent === 1 ? true : false,
                backgroundColor: event.eventColor,
              }
            }),
          }
        } else {
          return { events: [] }
        }
      })
      setSubscribedCalendarEvents(formatted)
    } else {
      setSubscribedCalendarEvents([{ events: [] }])
    }
  }, [subscribedCalendars])

  console.log("My Calendar Events ", myCalendarEvents)
  console.log("Subscribed Events ", subscribedCalendarEvents)

  // when a user clicks on am event, FullCalendar will invokes this function to initiate the selected event
  const handleEventClick = info => {
    const { id, start, end, title, allDay, extendedProps } = info.event
    setViewDialog({
      startDate: moment(start).format("MMMM DD, YYYY"),
      endDate: allDay
        ? moment(start).format("MMMM DD, YYYY")
        : moment(end).format("MMMM DD, YYYY"),
      startTime: allDay
        ? moment(start).format("h:mm A")
        : moment(start).format("h:mm A"),
      endTime: allDay
        ? moment(start).format("h:mm A")
        : moment(end).format("h:mm A"),
      eventTitle: title,
      eventLocation: extendedProps.location,
      eventNote: extendedProps.note,
      isAllDayEvent: allDay,
      uuid: id,
    })
    openViewModal(true)
  }

  const handleDateClick = info => {
    setUserCalendarEvent({
      startTime: moment(info.date).hours(6),
      endTime: moment(info.date).hours(7),
      eventTitle: "",
      eventLocation: "",
      eventNote: "",
      isAllDayEvent: false,
    })
    openCreateEvent(true)
  }

  const handleClosingCreateEvent = () => {
    setUserCalendarEvent(initialCreateEventProperty)
    openCreateEvent(false)
  }
  function eventDrop(info) {
    const { id, start, end } = info.event
    const eventOject = {
      startDate: moment(start).format("YYYY-MM-DD"),
      endDate: moment(end).format("YYYY-MM-DD"),
      startTime: moment(start).format(),
      endTime: moment(end).format(),
    }

    editUserCalendarEvent(id, eventOject)
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
          <Button
            classes={{ root: classes.createButton, label: classes.buttonLabel }}
            startIcon={<AddIcon />}
            onClick={() => setAddSubscribers(true)}>
            Add Subscriber
          </Button>
        </Grid>
      </Grid>
      <FullCalendar
        header={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,dayGridWeek,dayGridDay",
        }}
        defaultView="dayGridMonth"
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        events={events}
        // eventReceive={receive()}
        eventClick={handleEventClick}
        dateClick={handleDateClick}
        selectable={true}
        droppable={true}
        editable={true}
        eventDrop={eventDrop}
      />

      <ViewDialog
        modalOpen={openModal} //passes true or false for triger
        valueIntoModal={viewDialog} //passes stateData
        handleClose={() => openViewModal(false)} //triggers on or off
      />
      <CreateEvent open={createEvent} handleClose={handleClosingCreateEvent} />
      <AddSubscribers
        open={isAddSubscriberOpen}
        handleClose={() => setAddSubscribers(false)}
      />
    </div>
  )
}

export default Calendar
