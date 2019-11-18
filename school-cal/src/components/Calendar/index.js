import React, { useContext, useEffect, useState } from "react"
import { CalendarContext } from "../../contexts/calendar/calendarState"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import { Button, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import AddIcon from "@material-ui/icons/Add"

import CreateEvent from "../Events/CreateEvent"
import EditEvent from "../Events/EditEvent"
import moment from "moment"

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

const Calendar = () => {
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
        </Grid>
      </Grid>
      <FullCalendar
        defaultView="dayGridMonth"
        plugins={[dayGridPlugin]}
        events={events}
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
