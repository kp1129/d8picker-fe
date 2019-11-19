/* eslint-disable */

import React, { useContext, useEffect, useState } from "react"
import { clientWithAuth } from "../../utilities/api"
import { Link, Route } from "react-router-dom"

//adding components
import AddEvent from "../../components/Events/CreateEvent"
import Navbar from "../../components/Navbar"
import Sidebar from "../../components/Sidebar"
import Calendar from "../../components/Calendar"

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
import { makeStyles } from "@material-ui/core/styles"
import { useTheme } from "@material-ui/core/styles"

import "../../components/AdminDashboard/adminDash.css"
import ReactGA from "react-ga"

import clsx from "clsx"

// setting styles
const drawerWidth = 240
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
}))

const AdminDashBoard = props => {
  ReactGA.pageview(window.location.pathname + window.location.search)

  const classes = useStyles()
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Grid container>
        <Navbar />
        <Grid item xs={3}>
          <Sidebar />
        </Grid>
        <Grid item xs={9} className={classes.content}>
          <div className={classes.toolbar} />
          <Calendar />
        </Grid>
      </Grid>
    </div>
  )
}

export default AdminDashBoard
