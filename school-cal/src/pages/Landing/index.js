import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { Link } from "react-router-dom";
const Landing = () => {
  return (
    <>
      <h1>Future Landing Page</h1>
      <List>
        <ListItem>
          <Link to="/admin-signin">Admin Sign In</Link>
        </ListItem>
        <ListItem>
          <Link to="/admin-register">Admin Register</Link>
        </ListItem>
      </List>
    </>
  );
};

export default Landing;
