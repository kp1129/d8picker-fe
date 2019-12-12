import React, { useEffect, useState } from "react"
import moment from "moment"
import { clientWithAuth } from "../../utilities/api"
import {
  Badge,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import MoreUpcomingEvents from "./MoreUpcomingEvents"
const useStyles = makeStyles(theme => ({
  badge: {
    margin: theme.spacing(1, 0),
    padding: theme.spacing(0.5, 0),
  },
  header: {
    padding: theme.spacing(0, 2, 0, 0),
  },
  paper: {
    width: "100%",
    display: "flex",
  },

  dateContainer: {
    padding: theme.spacing(1, 2),
    marginRight: theme.spacing(2),
    color: "white",
  },
}))
const UpcomingEvents = () => {
  const classes = useStyles()

  const [upcomingEvents, setUpComingEvents] = useState([])
  const [moreUpcomingEventsDialog, openMoreUpcomingEventsDialog] = useState(
    false,
  )
  useEffect(() => {
    const getUpcomingEvents = async () => {
      const events = await clientWithAuth("/api/events/upcoming")

      setUpComingEvents(events.data)
    }

    getUpcomingEvents()
  }, [])

  const handleClick = () => {
    console.log("click")
  }
  return (
    <div style={{ width: "100%" }}>
      <Badge
        color="secondary"
        badgeContent={upcomingEvents.length}
        showZero
        className={classes.badge}>
        <Typography variant="h6" className={classes.header}>
          Upcoming Events
        </Typography>
      </Badge>

      {upcomingEvents.length > 0 && (
        <List dense>
          {upcomingEvents.slice(0, 3).map(event => (
            <ListItem key={event.uuid}>
              <Paper className={classes.paper}>
                <ListItemAvatar
                  className={classes.dateContainer}
                  style={{
                    backgroundColor: event.calendarColor,
                  }}>
                  <Typography align="center">
                    {moment(event.startDate).format("ddd")}
                  </Typography>
                  <Typography align="center" style={{ fontWeight: "bold" }}>
                    {moment(event.startDate).format("MM/DD")}
                  </Typography>
                </ListItemAvatar>
                <ListItemText primaryTypographyProps={{ variant: "body2" }}>
                  {event.eventTitle}
                </ListItemText>
              </Paper>
            </ListItem>
          ))}
          {upcomingEvents.length > 3 && (
            <ListItem button onClick={() => openMoreUpcomingEventsDialog(true)}>
              More Events
            </ListItem>
          )}
        </List>
      )}
      <MoreUpcomingEvents
        open={moreUpcomingEventsDialog}
        events={upcomingEvents}
        handleClose={() => openMoreUpcomingEventsDialog(false)}
      />
    </div>
  )
}

export default UpcomingEvents
