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

const Calendar = () => {
  const classes = useStyles()
  const { userCalendarEvents, setUserCalendarEvent } = useContext(
    CalendarContext,
  )

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
          start: event.isAllDayEvent ? event.startDate : event.startTime,
          end: event.isAllDayEvent ? event.endDate : event.endTime,
          title: event.eventTitle,
          location: event.eventLocation,
          note: event.eventNote,
          allDay: event.isAllDayEvent === 1 ? true : false,
          backgroundColor: event.eventColor,
        }
      })

      setEvents(formatted)
    } else {
      setEvents([])
    }
  }, [userCalendarEvents])

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
      <Grid container className={classes.headerContainer}>
        <Grid item xs={12}>
          <Button
            classes={{ root: classes.createButton, label: classes.buttonLabel }}
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
        defaultView="dayGridMonth"
        plugins={[dayGridPlugin, interactionPlugin]}
        events={events}
        eventClick={handleEventClick}
        dateClick={handleDateClick}
        selectable={true}
        select={handleDatesSelection}
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
