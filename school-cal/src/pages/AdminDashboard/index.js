/* eslint-disable */

import React, { useContext, useEffect, useState } from "react";
import axios from 'axios'
import { Link, Route } from "react-router-dom"

//adding components
import AddEvent from "../../components/Events/AddEvent";
import Navbar from "../../components/Navbar"
<<<<<<< HEAD
import AdminDashCal from '../../components/AdminDashboard/index'
=======
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
>>>>>>> development

//setting auth
import { AuthContext } from "../../contexts/auth/authState"

<<<<<<< HEAD
// styling/css
// import EventDisplay from "../../components/Events/EventDisplay"
// import {
//   Button,
//   Divider,
//   Drawer,
//   CssBaseline,
//   InputLabel,
//   Grid,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   MenuItem,
//   Select,
// } from "@material-ui/core"
// import AddIcon from "@material-ui/icons/Add"
// import { makeStyles } from "@material-ui/core/styles"
// import { useTheme } from "@material-ui/core/styles"
// import AppBar from "@material-ui/core/AppBar"
// import Toolbar from "@material-ui/core/Toolbar"
// import Typography from "@material-ui/core/Typography"
// import IconButton from "@material-ui/core/IconButton"
// import MenuIcon from "@material-ui/icons/Menu"
// import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
// import ChevronRightIcon from "@material-ui/icons/ChevronRight"
// import { AppBar } from "@material-ui/core";
import '../../components/AdminDashboard/adminDash.css'
=======
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
>>>>>>> development

import clsx from "clsx"

// setting styles
// const drawerWidth = 240
// const useStyles = makeStyles(theme => ({
//   root: {
//     display: "flex",
//   },
//   appBar: {
//     transition: theme.transitions.create(["margin", "width"], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//   },
//   appBarShift: {
//     width: `calc(100% - ${drawerWidth}px)`,
//     marginLeft: drawerWidth,
//     transition: theme.transitions.create(["margin", "width"], {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   hide: {
//     display: "none",
//   },
//   drawer: {
//     width: drawerWidth,
//     flexShrink: 0,
//   },
//   drawerPaper: {
//     width: drawerWidth,
//   },
//   drawerHeader: {
//     display: "flex",
//     alignItems: "center",
//     padding: theme.spacing(0, 1),
//     ...theme.mixins.toolbar,
//     justifyContent: "flex-end",
//   },
//   content: {
//     flexGrow: 1,
//     padding: theme.spacing(3),
//     transition: theme.transitions.create("margin", {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     marginLeft: -drawerWidth,
//   },
//   contentShift: {
//     transition: theme.transitions.create("margin", {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//     marginLeft: 0,
//   },
// }))

<<<<<<< HEAD
const AdminDashBoard = (props) => {

  // const { currentUser, signOut } = useContext(AuthContext)
  // const [isAddEventOpen, setAddEvent] = useState(false)
  // const [calendar, setCalendar] = useState({ id: "" })
  // const [open, setOpen] = React.useState(false)
  // // const theme = useTheme()
  // const [userProfile, setUserProfile] = useState(null)
  // console.log(props)
  // const handleDrawerOpen = () => {
    //   setOpen(true)
    // }
    
    // const handleDrawerClose = () => {
      //   setOpen(false)
      // }
      // const [data, setData] = useState([]);
      const [calendars, setCalendars] = useState([])

=======
  const handleDrawerClose = () => {
    setOpen(false)
  }
  console.log(currentUser)
  console.log(calendar)
  console.log(calendars)
  //used to get users
>>>>>>> development
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
  //used to get users
  // useEffect(() => {
  //   const getUserProfile = async () => {
  //     try {
  //       const profileRef = await db.collection("users").doc(currentUser.uid)

  //       const profile = await profileRef.get()
  //       setUserProfile(profile.data())

  //       //setUserProfile(profileRef.get());
  //     } catch (error) {
  //       console.log("Unable to retrieve user profile.")
  //     }
  //   }

  //   getUserProfile()
  // }, [])

  // // load user calendars
  // useEffect(() => {
  //   if (currentUser) {
  //     axios('')
  //     //   db.collection("calendars")
      //     .where("admins", "array-contains", currentUser.uid)
      //     .get()
      //     .then(querySnapshot => {
    //       querySnapshot.forEach(doc => {
      //         const calendar = {
    //           id: doc.id,
    //           name: doc.data().name,
    //           admins: doc.data().admins,
    //           students: doc.data().students,

    //         }
    //         setCalendars([...calendars, calendar])
    //       })
    //     })
    //     .catch(error => {
      //       console.log(error)
      //     })
      // }
    // }
      
    // }, [currentUser])
    
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

  // const classes = useStyles()
  return (
<<<<<<< HEAD
    <div>
      <Navbar />
      <h2 
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
      <Route to path='/calendar/:id' /> 

      {/* <AdminDashCal
        // props= {props}
      /> */}
=======
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
>>>>>>> development
    </div>
  )
  // {
    
  //   <div className={classes.root}>
  //     <CssBaseline />
  //     <Navbar drawerWidth={drawerWidth} />
  //     <AppBar
  //       position="fixed"
  //       className={clsx(classes.appBar, {
  //         [classes.appBarShift]: open,
  //       })}>
  //       <Toolbar>
  //         <IconButton
  //           color="inherit"
  //           aria-label="open drawer"
  //           onClick={handleDrawerOpen}
  //           edge="start"
  //           className={clsx(classes.menuButton, open && classes.hide)}>
  //           <MenuIcon />
  //         </IconButton>
  //         <Typography variant="h6" className={classes.title}>
  //           School Calendar
  //         </Typography>
  //         <Button
  //           color="inherit"
  //           onClick={signOut}
  //           style={{ marginLeft: "80%" }}>
  //           Sign Out
  //         </Button>
  //       </Toolbar>
  //     </AppBar>
  //     <Drawer
  //       className={classes.drawer}
  //       variant="persistent"
  //       anchor="left"
  //       open={open}
  //       classes={{
  //         paper: classes.drawerPaper,
  //       }}>
  //       <div className={classes.drawerHeader}>
  //         <IconButton onClick={handleDrawerClose}>
  //           {theme.direction === "ltr" ? (
  //             <ChevronLeftIcon />
  //           ) : (
  //             <ChevronRightIcon />
  //           )}
  //         </IconButton>
  //       </div>
  //       <Divider />
  //       <List>
  //         <ListItem
  //           button
  //           className={classes.listItem}
  //           onClick={() => setAddEvent(true)}>
  //           <ListItemIcon>
  //             <AddIcon />
  //           </ListItemIcon>
  //           <ListItemText primary={"Add Event"} />
  //         </ListItem>
  //       </List>
  //       <Divider />
  //       <List>
  //         <ListItem>
  //           <Select onChange={handleChange} value={calendar.id}>
  //             {calendars.map(calendar => (
  //               <MenuItem key={calendar.id} value={calendar.id}>
  //                 {calendar.name}
  //               </MenuItem>
  //             ))}
  //           </Select>
  //           <ListItemText>Calendar</ListItemText>
  //         </ListItem>
  //       </List>
  //       <Grid container>
  //         <Grid item xs={12}></Grid>
  //       </Grid>
  //     </Drawer>
  //     <main className={classes.content} style={{height:"300px", width:"300px" }}>
  //       <AdminDashCal />
  //     </main>
  //     <AddEvent
  //       handleClose={() => setAddEvent(false)}
  //       open={isAddEventOpen}
  //       calendar={calendar}
  //     />
  //   </div>
  // }
}

export default AdminDashBoard
