import React, { useState } from "react"
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

const MyCalendars = ({ userCalendars, checkedCalendars, onChange }) => {
  const [menu, openMenu] = useState(null)

  const handleCalendarSettings = calendarUuid => {}

  const handleClose = () => {
    openMenu(null)
  }

  const handleClick = event => {
    openMenu(event.currentTarget)
  }
  return (
    <div style={{ width: "100%" }}>
      <Typography variant="h6">My Calendars</Typography>

      <List dense>
        {userCalendars.map(calendar => (
          <ListItem key={calendar.uuid}>
            <Menu
              anchorEl={menu}
              open={Boolean(menu)}
              keepMounted
              onClose={handleClose}>
              <MenuItem onClick={() => handleCalendarSettings(calendar.uuid)}>
                Settings
              </MenuItem>
            </Menu>
            <ListItemIcon>
              <Checkbox
                edge="start"
                onChange={onChange}
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
    </div>
  )
}

export default MyCalendars
