import React, { useContext, useEffect, useState } from "react"
import EventDisplay from '../Events/EventDisplay';
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
const drawerWidth = 240
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(10, 2),
  },
  listItem: {
    display: "flex",
    justifyContent: "center",
  },
}))

const AdminDashBoard = ({ history }) => {
  const { currentUser } = useContext(AuthContext)
  const [isAddEventOpen, setAddEvent] = useState(false)
  useEffect(() => {
    if (!currentUser) {
      history.push("/sign-in")
    }
  }, [currentUser])

  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Navbar drawerWidth={drawerWidth} />
      <Drawer
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
        className={classes.drawer}
        variant="permanent">
        <div className={classes.toolbar} />
        <Divider />
        <List>
          <ListItem
            button
            className={classes.listItem}
            onClick={() => setAddEvent(true)}>
            Add Event
          </ListItem>
        </List>
      </Drawer>
      <main className="classes.content">
        <EventDisplay />
      </main>
      <AddEvent handleClose={() => setAddEvent(false)} open={isAddEventOpen} />
    </div>
  )
}

export default AdminDashBoard
