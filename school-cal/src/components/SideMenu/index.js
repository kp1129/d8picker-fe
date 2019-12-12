import React, { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../contexts/auth/authState"
import { CalendarContext } from "../../contexts/calendar/calendarState"

import MyCalendars from "./MyCalendars"
import SubscribedCalendars from "./SubscribedCalendars"
import UpcomingEvents from "./UpcomingEvents"
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
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
    flexDirection: "column",
    alignItems: "flex-start",
  },
  userProfileContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },

  upComingEventsContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(4),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 180,
  },
}))

const SideMenu = ({ history }) => {
  //const [userCalendar, setUserCalendar] = useState(null)
  const { userProfile } = useContext(AuthContext)
  const {
    userCalendars,
    userCalendar,
    getMyCalendarEvents,
    unSubscribeCalendar,
    setShowEvents,
    setUserCalendar,
  } = useContext(CalendarContext)

  // set user default calendar to the select list

  useEffect(() => {
    if (userCalendars.length > 0) {
      const primaryCalendar = userCalendars.find(calendar => calendar.isDefault)
      setUserCalendar(primaryCalendar.uuid)
    }
  }, [userCalendars])

  useEffect(() => {
    if (userCalendar.uuid) {
      getMyCalendarEvents(userCalendar.uuid)
    }
  }, [userCalendar])

  // useEffect(() => {
  //   if (userCalendar) {
  //     setUserCalendar(userCalendar.uuid)
  //   }
  // }, [userCalendar])

  const handleCalendarChange = calendarUuid => {
    const myCalendar = userCalendars.find(
      calendar => calendar.uuid === calendarUuid,
    )

    if (myCalendar.showEvents) {
      setShowEvents(myCalendar.uuid, false)
    } else {
      getMyCalendarEvents(calendarUuid)
      setShowEvents(myCalendar.uuid, true)
    }
  }

  const handleUnsubscribeCalendar = calendarUuid => {
    unSubscribeCalendar(calendarUuid)
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
            <MyCalendars
              userCalendars={userCalendars}
              onChange={handleCalendarChange}
              history={history}
            />
          </ListItem>
          <Divider />
          <ListItem className={classes.subscribedCalendarsContainer}>
            <SubscribedCalendars
              userCalendars={userCalendars}
              onChange={handleCalendarChange}
              unsubscribeCalendar={handleUnsubscribeCalendar}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <UpcomingEvents />
          </ListItem>
        </List>
      </Drawer>
    </div>
  )
}

export default SideMenu
