import React, { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { CalendarContext } from "../../contexts/calendar/calendarState"

import {
  Divider,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core"
import ShareIcon from "@material-ui/icons/Share"
import SettingsIcon from "@material-ui/icons/Settings"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import { makeStyles } from "@material-ui/core/styles"

import Navbar from "../../components/Navbar"

import General from "../../components/CalendarSettings/General"
import Privacy from "../../components/CalendarSettings/Privacy"
import Delete from "../../components/CalendarSettings/Delete"

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },

  toolbar: theme.mixins.toolbar,

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  settingContainer: {
    margin: theme.spacing(3, 0),
  },
}))

const CalendarSettings = ({ history, match }) => {
  const {
    userCalendar,
    userCalendarsError,
    editUserCalendarPrivacy,
    deleteUserCalendar,
  } = useContext(CalendarContext)

  const classes = useStyles()
  const { cal_uuid } = match.params

  useEffect(() => {
    if (!cal_uuid) {
      history.push("/admin-dashboard")
    }
  }, [cal_uuid])

  return (
    <div className={classes.root}>
      <Grid container>
        <Navbar />
        <Grid item xs={3}>
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{ paper: classes.drawerPaper }}>
            <div className={classes.toolbar} />
            <List>
              <ListItem button component={Link} to="/admin-dashboard">
                <ListItemIcon>
                  <ArrowBackIcon />
                </ListItemIcon>
                <ListItemText>Back to dashboard</ListItemText>
              </ListItem>
              <Divider />
              <ListItem button>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText>General</ListItemText>
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <ShareIcon />
                </ListItemIcon>
                <ListItemText>Privacy</ListItemText>
              </ListItem>
            </List>
          </Drawer>
        </Grid>
        <Grid item xs={9} className={classes.content}>
          <div className={classes.toolbar} />
          <Grid>
            <Grid item xs={6} className={classes.settingContainer}>
              <General calendar={userCalendar} />
            </Grid>
            <Grid item xs={6}>
              <Privacy
                calendar={userCalendar}
                editUserCalendarPrivacy={editUserCalendarPrivacy}
              />
            </Grid>
            <Grid item xs={6} className={classes.settingContainer}>
              <Delete
                calendar={userCalendar}
                deleteUserCalendar={deleteUserCalendar}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default CalendarSettings
