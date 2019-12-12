import React from "react"
import moment from "moment"
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
const useStyles = makeStyles(theme => ({
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
const MoreUpcomingEvents = ({ events, open, handleClose }) => {
  const classes = useStyles()
  return (
    <div>
      <Dialog open={open} fullWidth>
        <DialogTitle>Upcoming Events</DialogTitle>
        <DialogContent>
          {events.length > 0 && (
            <List>
              {events.map(event => (
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
            </List>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default MoreUpcomingEvents
