/* eslint-disable */

import React, { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../contexts/auth/authState"
import axios from 'axios';

//fullcalendar
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

// full calendar styles 
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import '@fullcalendar/list/main.css';

import AddEvent from "../Events/AddEvent";

const AdminDashBoard = (props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchCalendars = async() => {
      try {
        const id = props.match.params.id
        const res = await axios.get(`http://localhost:4000/api/calendars/${id}/events`)
        setData(res.data)
      }catch (e){
        console.log(e)
      }
    }
    fetchCalendars()
  },[]);

  
  function displayEvent() {   
    return data.map(event => (
      {
        title: event.eventName,
        start:'2019-11-11'
      }
      ))
  } 

  return (
    <div className="full-calendar">
      <FullCalendar 
        timeZone= 'local'
        defaultView='dayGridMonth' 
        plugins={[ dayGridPlugin, timeGridPlugin, listPlugin ]}
        events= {displayEvent()}
        />
    </div>
    
  )
}

export default AdminDashBoard
