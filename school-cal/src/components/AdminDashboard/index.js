import React, { useContext } from "react";
import { AuthContext } from "../../contexts/auth/authState";
import Navbar from "../../components/Navbar";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
// full calendar
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";

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

      <main className={classes.content}>
        <FullCalendar
          defaultView="dayGridMonth"
          plugins={[dayGridPlugin]}
          events={[{ title: "Sample Meeting", date: "2019-10-14" }]}
        />
      </main>
    </div>
  );
};

export default AdminDashBoard;
