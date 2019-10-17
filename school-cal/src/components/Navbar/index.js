import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import { AuthContext } from "../../contexts/auth/authState";
import { db } from "../../firebase";

const Navbar = ({ drawerWidth }) => {
  const { currentUser, signOut } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState(null);

  const useStyles = makeStyles(theme => ({
    menuButton: {
      marginRight: theme.spacing(2)
    },
    greeting: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  }));

  const classes = useStyles();

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

  return (
    <div>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            School Calendar
          </Typography>
          {userProfile && (
            <Typography className={classes.greeting}>
              Hello, {userProfile.firstName}
            </Typography>
          )}
          <Button color="inherit" onClick={signOut}>
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
