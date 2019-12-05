import React, { useContext, useEffect, useState } from "react"
import { CalendarContext } from "../../contexts/calendar/calendarState"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import { Button, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import AddIcon from "@material-ui/icons/Add"
import SettingIcon from "@material-ui/icons/Settings"

import CreateEvent from "../Events/CreateEvent"
import EditEvent from "../Events/EditEvent"
import AddSubscribers from "../Events/addSubscriber"
import moment from "moment"


import timeGridPlugin from "@fullcalendar/timegrid"



const useStyles = makeStyles(theme => ({
  calendarNav: {
    marginBottom: theme.spacing(3),
    display: "flex",
    justifyContent: "space-between",
  },
  createButton: {
    backgroundColor: "#F5945B",
    marginRight: theme.spacing(3),
  },
  buttonLabel: {
    textTransform: "none",
  },
}))

const Calendar = () => {
  const classes = useStyles()
  const {
    userCalendarEvents,
    setUserCalendarEvent,
    subscribedCalendars,
  } = useContext(CalendarContext)

  const [createEvent, openCreateEvent] = useState(false)
  const [isAddSubscriberOpen, setAddSubscribers] = useState(false)
  const [editEvent, openEditEvent] = useState(false)

  const [events, setEvents] = useState([])

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
          start: event.isAllDayEvent ? event.startDate : event.startTime,
          end: event.isAllDayEvent ? event.endDate : event.endTime,
          title: event.eventTitle,
          location: event.eventLocation,
          note: event.eventNote,
          allDay: event.isAllDayEvent === 1 ? true : false,
          backgroundColor: event.eventColor,
        }
      })

      setMyCalendarEvents({ events: formatted })
    } else {
      setMyCalendarEvents({ events: [] })
    }
  }, [userCalendarEvents])

  const handleEventClick = info => {
    const { id, start, end, title, allDay, extendedProps } = info.event

    setUserCalendarEvent({
      startTime: moment(start),
      endTime: moment(end),
      eventTitle: title,
      eventLocation: extendedProps.location,
      eventNote: extendedProps.note,
      isAllDayEvent: allDay,
      uuid: id,
    })
    openEditEvent(true)
  }

  const handleDateClick = info => {
    setUserCalendarEvent({
      startDate: moment(info.date).format("YYYY-MM-DD"),
      endDate: moment(info.date).format("YYYY-MM-DD"),
      startTime: moment(info.date)
        .hours(6)
        .toISOString(true),
      endTime: moment(info.date)
        .hours(7)
        .toISOString(true),
      eventTitle: "",
      eventLocation: "",
      eventNote: "",
      isAllDayEvent: false,
    })
    openCreateEvent(true)
  }

  const handleDatesSelection = info => {
    setUserCalendarEvent({
      startTime: moment(info.startStr).hours(0),
      endTime: moment(info.endStr).hours(0),
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

  return (
    <div>
      <Grid container>
        <Grid item xs={12} className={classes.calendarNav}>
          <div>
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
              classes={{
                root: classes.createButton,
                label: classes.buttonLabel,
              }}
              startIcon={<AddIcon />}
              onClick={() => setAddSubscribers(true)}>
              Add Subscriber
            </Button>
          </div>

          <Button
            classes={{
              root: classes.createButton,
              label: classes.buttonLabel,
            }}
            startIcon={<SettingIcon />}
            component={Link}
            to="/calendar-settings">
            Calendar Settings
          </Button>
        </Grid>
      </Grid>
      <FullCalendar
        header={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,dayGridWeek,dayGridDay"
        }}  
        
        defaultView="dayGridMonth"
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        eventSources={[myCalendarEvents, ...subscribedCalendarEvents]}
        eventClick={handleEventClick}
        dateClick={handleDateClick}
        selectable={true}
        select={handleDatesSelection}
      />
      <CreateEvent open={createEvent} handleClose={handleClosingCreateEvent} />
      <EditEvent open={editEvent} handleClose={() => openEditEvent(false)} />
      <AddSubscribers
        open={isAddSubscriberOpen}
        handleClose={() => setAddSubscribers(false)}
      />
    </div>
  )
}

export default Calendar
