/* eslint-disable */

import React, { useContext, useEffect, useState } from "react"
import EventDisplay from "../Events/EventDisplay"
import {
  Button,
  Divider,
  Drawer,
  Grid,
  List,
  ListItem,
} from "@material-ui/core"
import AddEvent from "../Events/AddEvent"
import { makeStyles } from "@material-ui/core/styles"

import Navbar from "../../components/Navbar"
import { AuthContext } from "../../contexts/auth/authState"
import { app, db } from "../../firebase"



import clsx from 'clsx';
import {useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';








const drawerWidth = 240
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

const AdminDashBoard = ({ history }) => {
  const { currentUser, signOut } = useContext(AuthContext)
  const [isAddEventOpen, setAddEvent] = useState(false)
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();

  
  const [userProfile, setUserProfile] = useState(null);
  const [data, setData] = useState([]);


  useEffect(() => {
      eventsDbRef
          .get()
          .then(snapshot => {
              snapshot.docs.map(doc => console.log(doc.id))
              setData(snapshot.docs.map(doc => doc.data()))
          })
          .catch(err=> console.log('something is up', err))
  },[])




  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!currentUser) {
      history.push("/sign-in")
    }
  }, [currentUser])

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const profileRef = await db.collection("users").doc(currentUser.uid);

        const profile = await profileRef.get();
        setUserProfile(profile.data());

        //setUserProfile(profileRef.get());
      } catch (error) {
        console.log("Unable to retrieve user profile.");
      }
    };

    getUserProfile();
  }, []);

  const classes = useStyles()
  return (
    <div className={classes.root}>
        <Navbar drawerWidth={drawerWidth} />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
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
      <main className="classes.content">
        <EventDisplay />
      </main>
      <AddEvent handleClose={() => setAddEvent(false)} open={isAddEventOpen} />
    </div>
  )
}

export default AdminDashBoard
