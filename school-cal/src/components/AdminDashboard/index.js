import React from 'react';
import fireapp from "../../firebase/index";

import Navbar from "../../components/Navbar";

import { app } from "../../firebase";
import { getDayClasses } from "@fullcalendar/core";
const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(10, 2)
  },
  list: {
    textAlign: "center"
  }
}));

const AdminDashBoard = () => {
  const classes = useStyles();
  return (
    <div className={getDayClasses.root}>
      <Navbar drawerWidth={drawerWidth} />
      <Drawer
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
        className={classes.drawer}
        variant="permanent"
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          <Button>Add Event</Button>
        </List>
      </Drawer>
      </div>
  )
};
