import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
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
import AddIcon from "@material-ui/icons/Add"
import { makeStyles } from "@material-ui/core/styles"
import CreateCalendar from "./CreateCalendar"
import { CalendarContext } from "../../contexts/calendar/calendarState"
const useStyles = makeStyles(theme => ({
  myCalendarsHeader: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
}))
const MyCalendars = ({ userCalendars, onChange, history }) => {
  const classes = useStyles()
  const { setUserCalendar } = useContext(CalendarContext)
  const [anchorEl, setAnchorEl] = useState(null)
  const [menus, setMenus] = useState([])
  const [createCalendar, openCreateCalendar] = useState(false)
  const [myCalendars, setMyCalendars] = useState("")

  useEffect(() => {
    if (userCalendars.length > 0) {
      const calendars = userCalendars.filter(calendar => calendar.isOwner)
      setMyCalendars(calendars)
      setMenus(calendars.map(calendar => false))
    }
  }, [userCalendars])

  const handleCalendarSettings = calendarUuid => {
    setUserCalendar(calendarUuid)
    history.push(`/calendar-settings/${calendarUuid}`)
  }

  const handleClose = index => () => {
    menus[index] = false
    setAnchorEl(null)
    setMenus(menus)
  }

  const handleClick = (index, event) => {
    menus[index] = true
    setAnchorEl(event.currentTarget)
    setMenus(menus)
  }

  return (
    <div style={{ width: "100%" }}>
      <div className={classes.myCalendarsHeader}>
        <Typography variant="h6">My Calendars</Typography>
        <IconButton aria-label="add" onClick={() => openCreateCalendar(true)}>
          <AddIcon />
        </IconButton>
      </div>

      <List dense>
        {myCalendars.length > 0 &&
          myCalendars.map((calendar, index) => (
            <ListItem key={calendar.uuid}>
              <Menu
                id={calendar.uuid}
                anchorEl={anchorEl}
                open={menus[index]}
                keepMounted
                onClose={handleClose(index)}>
                <MenuItem onClick={() => handleCalendarSettings(calendar.uuid)}>
                  Settings
                </MenuItem>
              </Menu>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  onChange={() => onChange(calendar.uuid)}
                  checked={calendar.showEvents}
                  style={{ color: calendar.calendarColor }}
                />
              </ListItemIcon>
              <ListItemText>{calendar.calendarName}</ListItemText>

              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  onClick={event => handleClick(index, event)}>
                  <MoreVertIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
      </List>
      <CreateCalendar
        open={createCalendar}
        handleClose={() => openCreateCalendar(false)}
      />
    </div>
  )
}

export default MyCalendars
