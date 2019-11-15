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
    {/* <div className={classes.root}>
        <Navbar drawerWidth={drawerWidth} />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        style={{background:"#21242C"}}
      >
        <Toolbar style={{background:"#21242C"}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            School Calendar
          </Typography>
          {userProfile && (
            <Typography className={classes.greeting} style={{marginLeft:"80%"}}>
              Hello, {userProfile.firstName}
            </Typography>
          )}
          <Button color="inherit" onClick={signOut}>
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem
            button
            className={classes.listItem}
            onClick={() => setAddEvent(true)}>
            Add Event
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem>
            {data.map(info => {
              <div><p>{console.log("IN THE SIDEBAR"+ info)}</p></div>
            })}
          </ListItem>
        </List>
        <Divider />
        
      </Drawer>
      <AddEvent handleClose={() => setAddEvent(false)} open={isAddEventOpen} />
    </div>
     */}
    </div>
      
  )
}

export default AdminDashBoard
