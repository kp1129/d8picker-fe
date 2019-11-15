/* eslint-disable */

//needs react
import React, { useContext, useEffect, useState } from "react";
import axios from 'axios'
import { Link } from "react-router-dom"

import clsx from "clsx"


// adding components
import Navbar from "../../components/Navbar"
import SideBar from "../../components/sidebar/index"

import { AppBar } from "@material-ui/core";
import '../../components/AdminDashboard/adminDash.css'


const AdminDashBoard = (props) => {
   ReactGA.pageview(window.location.pathname + window.location.search);

  const { currentUser, signOut } = useContext(AuthContext)
  const [isAddEventOpen, setAddEvent] = useState(false)
  const [calendar, setCalendar] = useState({ id: "" })
  const [open, setOpen] = React.useState(false)
  // // const theme = useTheme()
  // const [userProfile, setUserProfile] = useState(null)
    
  const [calendars, setCalendars] = useState([])

  //used to get users
  useEffect(() => {
    const fetchUsers = async() => {
      try {
        const id = props.match.params.id
        //get calendar id
        // .get(`https://school-calendar-mataka.herokuapp.com/users/${id}/calendars`)
        const res = await axios.get(`http://localhost:4000/users/${id}/calendar`)
        setCalendars(res.data.calendars)
        console.log(res.data)
      }catch (e){
        console.log(e)
      }
    }
    fetchUsers()
  },[]);

    
  // pre-select a default primary calendar
  // useEffect(() => {
  //   if (calendars.length > 0) {
  //     const primaryCalendarIndex = calendars.findIndex(
  //       calendar => calendar.name === "primary",
  //     )

  //     const primaryCalendar = calendars[primaryCalendarIndex]
  //     setCalendar({ id: primaryCalendar.id })
  //   }
  // }, [calendars])

  // // handling calendar selected from the drop-down
  // const handleChange = event => {
  //   setCalendar({ id: event.target.value })
  // }

  return (
    <div>
      <div>
        <Navbar />
          <div>
            <SideBar />
          </div>
      </div>
      <h2 className="greeting">Hello welcome { calendars.length > 0 && `${calendars[0].username}`}</h2>
      {calendars.length > 0 && calendars.map(calendar => (
        <div 
          className='calendars'
          key={calendar.id}
          >
            <Link to ='/calendar/:id'>
              <p>{calendar.calendarName}</p>
              <p>{calendar.calendarDescription}</p>
            </Link>
        </div>
      ))}       
    </div>
  )}
export default AdminDashBoard


