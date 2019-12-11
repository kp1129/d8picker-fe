import React, { useEffect, useState } from "react"
import {
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core"
import MoreVertIcon from "@material-ui/icons/MoreVert"
const SubscribedCalendars = ({
  userCalendars,
  onChange,
  unsubscribeCalendar,
}) => {
  const [menu, openMenu] = useState(null)
  const [subscribedCalendars, setSubscribedCalendars] = useState([])

  useEffect(() => {
    if (userCalendars.length > 0) {
      const calendars = userCalendars.filter(calendar => !calendar.isOwner)
      setSubscribedCalendars(calendars)
    }
  }, [userCalendars])
  const handleClick = event => {
    openMenu(event.currentTarget)
  }

  const handleClose = () => {
    openMenu(null)
  }

  const handleUnsubscribe = calendarUuid => {
    unsubscribeCalendar(calendarUuid)
    openMenu(null)
  }
  return (
    <div style={{ width: "100%" }}>
      <Typography variant="h6">Subscribed Calendars</Typography>
      {subscribedCalendars.length > 0 ? (
        <List dense>
          {subscribedCalendars.map(calendar => (
            <ListItem key={calendar.uuid}>
              <Menu
                anchorEl={menu}
                open={Boolean(menu)}
                keepMounted
                onClose={handleClose}>
                <MenuItem onClick={() => handleUnsubscribe(calendar.uuid)}>
                  Unsubscribe
                </MenuItem>
              </Menu>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  onChange={() => onChange(calendar.uuid)}
                  value={calendar.uuid}
                />
              </ListItemIcon>
              <ListItemText>{calendar.calendarName}</ListItemText>

              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={handleClick}>
                  <MoreVertIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>You don't have any subscribed calendars</Typography>
      )}
    </div>
  )
}

export default SubscribedCalendars
