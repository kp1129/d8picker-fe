/* eslint-disable */

import React, { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../contexts/auth/authState"
import axios from "axios"

//adding components
import Navbar from "../Navbar/index"
import SideBar from "../sidebar/index"

//fullcalendar
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import listPlugin from "@fullcalendar/list"

import AddEvent from "../Events/CreateEvent"
import EventDisplay from "../Events/EventDisplay"
import { TwilioMessage } from "../../components/addUserTwilioMessage/index"

const AdminDashBoard = props => {
  const [data, setData] = useState([])
  useEffect(() => {
    const fetchCalendars = async () => {
      try {
        const id = props.match.params.id
        const res = await axios.get(
          `http://localhost:4000/api/calendars/${id}/events`,
        )
        setData(res.data)
        console.log("this is data", res.data)
      } catch (e) {
        console.log("this error", e)
      }
    }
    fetchCalendars()
  }, [])
  console.log("data", data)

  function displayEvent() {
    return data.map(event => ({
      title: event.eventName,
      start: event.startDate,
    }))
  }

  return (
    <div className="full-calendar">
      <div>
        <Navbar />
        <div>
          <SideBar />
        </div>
      </div>
      <FullCalendar
        timeZone="local"
        defaultView="dayGridMonth"
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interat]}
        events={displayEvent()}
      />
    </div>
  )
}

export default AdminDashBoard
