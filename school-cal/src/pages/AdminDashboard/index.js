/* eslint-disable */

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
import SideBar from "../../components/sidebar/index"
import '../../components/AdminDashboard/adminDash.css'
import ReactGA from 'react-ga';





const AdminDashBoard = (props) => {
   ReactGA.pageview(window.location.pathname + window.location.search);

  const { currentUser, signOut } = useContext(AuthContext)
  const [isAddEventOpen, setAddEvent] = useState(false)
  const [calendar, setCalendar] = useState({ id: "" })
  const [open, setOpen] = React.useState(false)

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


 
  return (
    <div>
      <Navbar />
      <div>
        <SideBar />
      <div>
      {/* <h2 
      className="greeting"
      
      >Hello welcome { calendars.length > 0 && `${calendars[0].username}`}</h2>
      {calendars.length > 0 && calendars.map(calendar => (
          <div 
            className='calendars'
            key={calendar.id}
            >
              <Link to ='/calendar/:id'>
      <p>{calendar.username}</p>
                <p>{calendar.calendarName}</p>
                <p>{calendar.calendarDescription}</p>
              </Link>
          </div>
      ))}     
      <Route to path='/calendar/:id' />  */}

      {/* <AdminDashCal
        // props= {props}
      /> */}

          </div>
        </div>
      



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


