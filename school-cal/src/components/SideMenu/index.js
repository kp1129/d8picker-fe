import React, { useContext, useEffect } from "react"
import { AuthContext } from "../../contexts/auth/authState"
import { CalendarContext } from "../../contexts/calendar/calendarState"

import MyCalendars from "./MyCalendars"
import SubscribedCalendars from "./SubscribedCalendars"
import UpcomingEvents from "./UpcomingEvents"
import {
  Avatar,
  Divider,
  Drawer,
  Grid,
  List,
  ListItem,
  Typography
} from "@material-ui/core"

//import TwilioMessage from "../addUserTwilioMessage/index"
import EmptyPersonAvatar from "../../assets/images/emptyperson.png"

import { makeStyles } from "@material-ui/core/styles"

// setting styles
const drawerWidth = 300
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },

  toolbar: theme.mixins.toolbar,

  miniBar: {
    backgroundColor: "#F2D2BF",
    height: "100vh"
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    margin: theme.spacing(2, 0),
    backgroundColor: "#F5945B",
    fontSize: theme.spacing(4)
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  listItemContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start"
  },
  userProfileContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column"
  },

  upComingEventsContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(4)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 180
  }
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
    setUserCalendar
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

  const handleCalendarChange = calendarUuid => {
    const myCalendar = userCalendars.find(
      calendar => calendar.uuid === calendarUuid
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
        <Grid container>
          <Grid item xs={2} className={classes.miniBar}></Grid>
          <Grid item xs={10}>
            <List>
              <ListItem className={classes.userProfileContainer}>
                <Avatar className={classes.avatar}>
                  {userProfile.firstName.charAt(0).toUpperCase() +
                    userProfile.lastName.charAt(0).toUpperCase()}
                </Avatar>
                <Typography variant="h5">{`${userProfile.firstName} ${userProfile.lastName}`}</Typography>
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
          </Grid>
        </Grid>
      </Drawer>
    </div>
  )
}

export default SideMenu
