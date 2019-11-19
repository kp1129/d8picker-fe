/* eslint-disable */
import React from "react"

//adding components
import Navbar from "../../components/Navbar"
import SideMenu from "../../components/SideMenu"
import Calendar from "../../components/Calendar"

// styling/css

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

import "../../components/AdminDashboard/adminDash.css"
import ReactGA from "react-ga"

// setting styles

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
          <SideMenu />
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
