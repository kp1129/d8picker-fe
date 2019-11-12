/* eslint-disable */

import React, { useContext, useEffect, useState } from "react"
import EventDisplay from "../../components/Events/EventDisplay"
import {
  Button,
  Divider,
  Drawer,
  CssBaseline,
  InputLabel,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
} from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"

import AddEvent from "../../components/Events/AddEvent"
import { makeStyles } from "@material-ui/core/styles"
import { db } from "../../config/firebase"
import Navbar from "../../components/Navbar"
import AdminDashCal from './AdminDashboard'

import clsx from "clsx"
import { useTheme } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"

import Typography from "@material-ui/core/Typography"
import EmptyPerson from "../../assets/images/emptyperson.png"

import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"

import { AuthContext } from "../../contexts/auth/authState"

const drawerWidth = 240
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    // flexGrow: 1,
    // padding: theme.spacing(3),
    // transition: theme.transitions.create("margin", {
    //   easing: theme.transitions.easing.sharp,
    //   duration: theme.transitions.duration.leavingScreen,
    // }),
    // marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}))

const AdminDashBoard = () => {
  const { currentUser, signOut } = useContext(AuthContext)
  const [isAddEventOpen, setAddEvent] = useState(false)
  const [calendars, setCalendars] = useState([])
  const [calendar, setCalendar] = useState({ id: "" })
  const [open, setOpen] = React.useState(false)
  const theme = useTheme()
  const [userProfile, setUserProfile] = useState(null)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  //used to get users
  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const profileRef = await db.collection("users").doc(currentUser.uid)

        const profile = await profileRef.get()
        setUserProfile(profile.data())

        //setUserProfile(profileRef.get());
      } catch (error) {
        console.log("Unable to retrieve user profile.")
      }
    }

    getUserProfile()
  }, [])

  // load user calendars
  useEffect(() => {
    if (currentUser) {
      db.collection("calendars")
        .where("admins", "array-contains", currentUser.uid)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const calendar = {
              id: doc.id,
              name: doc.data().name,
              admins: doc.data().admins,
              students: doc.data().students,
            }

            setCalendars([...calendars, calendar])
          })
        })
        .catch(error => {
          console.log(error)
        })
    }
  }, [currentUser])

  // pre-select a default primary calendar
  useEffect(() => {
    if (calendars.length > 0) {
      const primaryCalendarIndex = calendars.findIndex(
        calendar => calendar.name === "primary",
      )

      const primaryCalendar = calendars[primaryCalendarIndex]
      setCalendar({ id: primaryCalendar.id })
    }
  }, [calendars])

  // handling calendar selected from the drop-down
  const handleChange = event => {
    setCalendar({ id: event.target.value })
  }

  const classes = useStyles()
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar drawerWidth={drawerWidth} />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}>
        <Toolbar style={{background:"#21242C"}}>
          {/* <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}>
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            School Calendar
          </Typography>
          <Button
            color="inherit"
            onClick={signOut}
            style={{ marginLeft: "80%" }}>
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>
      <div className="user-side-bar" style={{display:"flex",flexDirection:"row",background:"#F2D2BF", height:"48.75vw", width:"21.55%"}}>
        <div><p style={{color:"white", background:"#F5945B", marginTop:"46vw", marginLeft:"30%", padding:"3px 8px"}}>+</p></div>
        <div style={{borderRight:"1px solid #EAEAEA", marginLeft:"1.75vw", width:"500px", background:"white", display:"flex", alignItems:"center", flexDirection:"column", textAlign:"center"}}>
          <div style={{marginTop:"20%"}}>
            <img src={EmptyPerson} alt="empty person"/>
          </div>
          <div>
            <h3>Pull Team Name From Backend</h3>
            <h5>Pull Email Here</h5>
          </div>
          <div>
            <Select onChange={handleChange} value={calendar.id} style={{background:"#F5945B"}}>
              {calendars.map(calendar => (
                <MenuItem key={calendar.id} value={calendar.id}>
                  {calendar.name}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div>
            <h3>UPCOMING EVENTS</h3>
          </div>
        </div>
      </div>
      {/* <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}>
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem
            button
            className={classes.listItem}
            onClick={() => setAddEvent(true)}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary={"Add Event"} />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem>
            <Select onChange={handleChange} value={calendar.id}>
              {calendars.map(calendar => (
                <MenuItem key={calendar.id} value={calendar.id}>
                  {calendar.name}
                </MenuItem>
              ))}
            </Select>
            <ListItemText>Calendar</ListItemText>
          </ListItem>
        </List>
        <Grid container>
          <Grid item xs={12}></Grid>
        </Grid>
      </Drawer> */}
      <main className={classes.content}>

        <AdminDashCal />
      </main>
      <AddEvent
        handleClose={() => setAddEvent(false)}
        open={isAddEventOpen}
        calendar={calendar}
      />
    </div>
  )
}

export default AdminDashBoard
