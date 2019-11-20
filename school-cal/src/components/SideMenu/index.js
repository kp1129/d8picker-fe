import React, { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../contexts/auth/authState"
import { CalendarContext } from "../../contexts/calendar/calendarState"
import moment from "moment"
import {
  Drawer,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core"
import TwilioMessage from "../addUserTwilioMessage/index"
import EmptyPersonAvatar from "../../assets/images/emptyperson.png"

import { makeStyles } from "@material-ui/core/styles"

// setting styles
const drawerWidth = 300
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
  },

  toolbar: theme.mixins.toolbar,

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  listItemContainer: {
    display: "flex",
    justifyContent: "center",
  },
  userProfileContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
  upComingEventsContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(6),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 180,
  },
}))

const SideMenu = () => {
  const [upComingEvents, setUpComingEvents] = useState([])
  const { userProfile } = useContext(AuthContext)
  const {
    userCalendar,
    userCalendars,
    getUserCalendarEvents,
    setUserCalendar,
    userCalendarEvents,
  } = useContext(CalendarContext)

  // set user default calendar to the select list

  useEffect(() => {
    if (userCalendars.length > 0) {
      const defaultCalendarIndex = userCalendars.findIndex(
        calendar => calendar.isDefault,
      )

      const defaultCalendar = userCalendars[defaultCalendarIndex]

      setUserCalendar({ uuid: defaultCalendar.uuid })
    }
  }, [userCalendars])

  // get user calendar events

  useEffect(() => {
    if (userCalendar) {
      getUserCalendarEvents(userCalendar.uuid)
    }
  }, [userCalendar])

  // get user upcoming events

  useEffect(() => {
    if (userCalendarEvents.length > 0) {
      const events = userCalendarEvents.filter(event =>
        moment(event.startTime).isAfter(),
      )

      const sorted = events
        .sort((a, b) => moment(a.startTime) - moment(b.startTime))
        .slice(0, 5)

      setUpComingEvents(sorted)
    } else {
      setUpComingEvents([])
    }
  }, [userCalendarEvents])
  const handleCalendarChange = event => {
    setUserCalendar({ uuid: event.target.value })
  }

  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Drawer
        anchor="left"
        className={classes.drawer}
        variant="permanent"
        classes={{ paper: classes.drawerPaper }}>
        <div className={classes.toolbar} />
        <List>
          <ListItem className={classes.userProfileContainer}>
            <img src={EmptyPersonAvatar} alt="image_placeholder" />
            <Typography variant="h5">{`${userProfile.firstName} ${userProfile.lastName}`}</Typography>
            <Typography variant="h6">{userProfile.email}</Typography>
          </ListItem>
          <ListItem className={classes.listItemContainer}>
            <FormControl className={classes.formControl}>
              <InputLabel id="calendar-select-label">Calendars</InputLabel>
              <Select
                labelid="calendar-select-label"
                onChange={handleCalendarChange}
                value={userCalendar ? userCalendar.uuid : ""}>
                {userCalendars.length > 0 &&
                  userCalendars.map(calendar => (
                    <MenuItem key={calendar.uuid} value={calendar.uuid}>
                      {calendar.calendarName}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </ListItem>
          <ListItem>
            <ListItemText className={classes.upComingEventsContainer}>
              <Typography variant="h5">Upcoming Events</Typography>
              <List dense>
                {upComingEvents.length > 0 &&
                  upComingEvents.map(event => (
                    <ListItem key={event.uuid}>
                      <ListItemText>{event.eventTitle}</ListItemText>
                    </ListItem>
                  ))}
              </List>
            </ListItemText>
          </ListItem>
        </List>
      </Drawer>
    </div>
  )
}

export default SideMenu
