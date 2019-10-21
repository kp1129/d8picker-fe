import React, { useContext, useEffect } from "react";
import { Button, Divider, Drawer, List } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Navbar from "../../components/Navbar";
import { AuthContext } from "../../contexts/auth/authState";
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

const AdminDashBoard = ({ history }) => {
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (!currentUser) {
      history.push("/admin-signin");
    }
  }, [currentUser]);

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
  );
};

export default AdminDashBoard;
