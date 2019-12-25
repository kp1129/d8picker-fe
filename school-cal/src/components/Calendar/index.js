import React, { useContext, useEffect, useState } from "react"
import { CalendarContext } from "../../contexts/calendar/calendarState"
import { Button, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import AddIcon from "@material-ui/icons/Add"

import CreateEvent from "../Events/CreateEvent"
import EditEvent from "../Events/EditEvent"
import AddSubscribers from "../Events/addSubscriber"
import CustomNotification from "../Events/CustomNotification"
import moment from "moment"

//fullcalendar
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import rrulePlugin from "@fullcalendar/rrule"
import "@fullcalendar/core/main.css"
import "@fullcalendar/daygrid/main.css"
import "@fullcalendar/timegrid/main.css"

const useStyles = makeStyles(theme => ({
  headerContainer: {
    marginBottom: theme.spacing(3)
  },
  createButton: {
    backgroundColor: "#F5945B",
    marginRight: theme.spacing(3)
  },
  buttonLabel: {
    textTransform: "none"
  }
}))

const Calendar = props => {
  const classes = useStyles()
  const {
    setUserCalendarEvent,
    userCalendars,
    editUserCalendarEvent
  } = useContext(CalendarContext)

  const [createEvent, openCreateEvent] = useState(false)
  const [isAddSubscriberOpen, setAddSubscribers] = useState(false)
  const [isCustomNotificationOpen, setCustomNotification] = useState(false)
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
    repeatSelection: { id: 1, name: "Never" }
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
                allDay: event.isAllDayEvent,
                rrule: event.rrule,
                isRepeatingEvent: event.isRepeatingEvent,
                calendarUuid: calendar.uuid,

                duration: Boolean(event.rrule)
                  ? Boolean(event.isAllDayEvent)
                    ? moment
                        .duration(moment(event.endDate).diff(event.startDate))
                        .asMilliseconds()
                    : moment
                        .duration(
                          moment(event.endTime).diff(moment(event.startTime))
                        )
                        .asMilliseconds()
                  : 0
              }
            }),
            color: calendar.calendarColor
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
    const { id, start, end, title, allDay, extendedProps, _def } = info.event
    console.log("Info ", info.event)
    setUserCalendarEvent({
      startDate: moment(start).format(),
      endDate: allDay
        ? moment(end)
            .subtract(1, "days")
            .format()
        : moment(end).format(),

      startTime: allDay
        ? moment(start)
            .hours(moment().hours())
            .toISOString()
        : moment(start).toISOString(true),
      endTime: allDay
        ? moment(start)
            .hours(
              moment()
                .add(1, "hours")
                .hours()
            )
            .toISOString()
        : extendedProps.isRepeatingEvent
        ? moment(extendedProps.end).toISOString()
        : moment(end).toISOString(true),
      eventTitle: title,
      eventLocation: extendedProps.location,
      eventNote: extendedProps.note,
      isRepeatingEvent: extendedProps.isRepeatingEvent,
      isAllDayEvent: allDay,
      calendarUuid: extendedProps.calendarUuid,
      existingRrule: extendedProps.isRepeatingEvent
        ? _def.recurringDef.typeData.options
        : null,
      uuid: id
    })

    openEditEvent(true)
  }

  const handleDateClick = info => {
    const primaryCalendar = userCalendars.find(calendar => calendar.isDefault)

    setUserCalendarEvent({
      calendarUuid: primaryCalendar.uuid,
      startDate: moment(info.date).format(),
      endDate: moment(info.date).format(),
      startTime: moment(info.date)
        .hours(moment().hours())
        .toISOString(true),
      endTime: moment(info.date)
        .hours(
          moment()
            .add(1, "hours")
            .hours()
        )
        .toISOString(true),
      eventTitle: "",
      eventLocation: "",
      eventNote: "",
      isAllDayEvent: false,
      isRepeatingEvent: false,
      rrule: null
    })
    openCreateEvent(true)
  }

  const handleDatesSelection = info => {
    const primaryCalendar = userCalendars.find(calendar => calendar.isDefault)
    setUserCalendarEvent({
      calendarUuid: primaryCalendar.uuid,
      startDate: moment(info.startStr).format(),
      endDate: moment(info.endStr)
        .subtract(1, "days")
        .format(),

      eventTitle: "",
      eventLocation: "",
      eventNote: "",
      isAllDayEvent: false,
      isRepeatingEvent: false,
      rrule: null
    })
    openCreateEvent(true)
  }

  const handleClosingCreateEvent = () => {
    setUserCalendarEvent(initialCreateEventProperty)
    openCreateEvent(false)
  }

  const handleEventTimeEdit = edit => {
    const { event } = edit
    const changes = {
      startDate: moment(event.start).format("YYYY-MM-DD"),
      endDate: moment(event.end).format("YYYY-MM-DD"),
      startTime: event.allDay
        ? null
        : moment(event.start)
            .hours(moment(event.start).hour())
            .minutes(moment(event.start).minute())
            .seconds(moment(event.start).second())
            .toISOString(true),
      endTime: event.allDay
        ? null
        : moment(event.end)
            .hours(moment(event.end).hour())
            .minutes(moment(event.end).minute())
            .seconds(moment(event.end).second())
            .toISOString(true)
    }
    editUserCalendarEvent(event.id, changes)
  }

  return (
    <div>
      <Grid container className={classes.headerContainer}>
        <Grid item xs={12}>
          <Button
            classes={{
              root: classes.createButton,
              label: classes.buttonLabel
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
          <Button
            classes={{ root: classes.createButton, label: classes.buttonLabel }}
            startIcon={<AddIcon />}
            onClick={() => setCustomNotification(true)}>
            Send Notification
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
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
          rrulePlugin
        ]}
        eventClick={handleEventClick}
        eventSources={[...userCalendarEvents]}
        dateClick={handleDateClick}
        selectable={true}
        droppable={true}
        editable={true}
        select={handleDatesSelection}
        eventAllow={(dropInfo, draggedEvent) => {
          if (!draggedEvent.extendedProps.isRepeatingEvent) {
            return true
          } else {
            return false
          }
        }}
        eventDrop={handleEventTimeEdit}
      />
      <CreateEvent open={createEvent} handleClose={handleClosingCreateEvent} />
      <EditEvent open={editEvent} handleClose={() => openEditEvent(false)} />
      <AddSubscribers
        open={isAddSubscriberOpen}
        handleClose={() => setAddSubscribers(false)}
      />
       <CustomNotification
        open={isCustomNotificationOpen}
        handleClose={() => setCustomNotification(false)}
      />
    </div>
  )
}

export default Calendar
