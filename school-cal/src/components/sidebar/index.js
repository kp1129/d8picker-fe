
import React, { useContext, useEffect, useState } from "react";
import axios from 'axios'
import { Link, Route } from "react-router-dom"

//adding components
import AddEvent from "../../components/Events/AddEvent";
import Navbar from "../../components/Navbar"
import AdminDashCal from '../../components/AdminDashboard/index'

//setting auth
import { AuthContext } from "../../contexts/auth/authState"

// styling/css
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
import { makeStyles } from "@material-ui/core/styles"
import { useTheme } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"
import EmptyPerson from "../../assets/images/emptyperson.png"
import AddUsers from "../addUsers/AddUsers"
import '../../components/AdminDashboard/adminDash.css'

import clsx from "clsx"

// setting styles
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
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}))

const SideBar = (props) => {
    const [isAddEventOpen, setAddEvent] = useState(false)
    const [isAddUserOpen, setAddUsers] = useState(false)
    const [calendar, setCalendar] = useState({ id: "" })
    const [calendars, setCalendars] = useState([])

  useEffect(() => {
    const fetchUsers = async() => {
      try {
        const id = props.match.params.id
        //get calendar id
        // .get(`https://school-calendar-mataka.herokuapp.com/users/${id}/calendars`)
        const res = await axios.get(`http://localhost:4000/users/${id}/calendar`)
        setCalendars(res.data.calendars)
      }catch (e){
        console.log(e)
      }
    }
    fetchUsers()
  },[]);
  console.log(calendars)
    
  
  const handleChange = event => {
    setCalendar({ id: event.target.value })
  }


  const classes = useStyles()
  return (
    <div> 
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
              <ListItem
                button
                className={classes.listItem}
                onClick={() => setAddUsers(true)}>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary={"Add Users"} />
              </ListItem>
            </List>

          </div>
        </div>
      </div>
      <AddEvent handleClose={() => setAddEvent(false)} open={isAddEventOpen} />
      <AddUsers handleClose={() => setAddUsers(false)} open={isAddUserOpen} />
    </div>
  )

}

export default SideBar


