import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
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
  const { setUserCalendarEvent, userCalendar, userCalendars } = useContext(
    CalendarContext,
  )

  const [createEvent, openCreateEvent] = useState(false)
  const [isAddSubscriberOpen, setAddSubscribers] = useState(false)
  const [editEvent, openEditEvent] = useState(false)

  const [userCalendarEvents, setUserCalendarEvents] = useState([{ events: [] }])

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
    if (userCalendars.length > 0) {
      const formatted = userCalendars.map(calendar => {
        if (calendar.showEvents && calendar.events.length > 0) {
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
              }
            }),
            color: calendar.calendarColor,
          }
        } else {
          return { events: [] }
        }
      })
      setUserCalendarEvents(formatted)
    } else {
      setUserCalendarEvents([{ events: [] }])
    }
  }, [userCalendars])

  // when a user clicks on am event, FullCalendar will invokes this function to initiate the selected event

  const handleEventClick = info => {
    const { id, start, end, title, allDay, extendedProps } = info.event

    setUserCalendarEvent({
      startDate: moment(start).format("YYYY-MM-DD"),
      endDate: allDay
        ? moment(start).format("YYYY-MM-DD")
        : moment(end).format("YYYY-MM-DD"),
      startTime: allDay
        ? moment(start)
            .hours(6)
            .toISOString()
        : moment(start).toISOString(true),
      endTime: allDay
        ? moment(start)
            .hours(7)
            .toISOString()
        : moment(end).toISOString(true),
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
      calendarUuid: userCalendars.find(calendar => calendar.isDefault).uuid,
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

          {userCalendar && (
            <Button
              classes={{
                root: classes.createButton,
                label: classes.buttonLabel,
              }}
              startIcon={<SettingIcon />}
              component={Link}
              to={`/calendar-settings/${userCalendar.uuid}`}>
              Calendar Settings
            </Button>
          )}
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
        eventClick={handleEventClick}
        eventSources={[...userCalendarEvents]}
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
