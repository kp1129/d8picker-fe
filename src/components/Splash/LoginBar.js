import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { TextField, Button, makeStyles } from "@material-ui/core";

// Pull in Modal component (register form)
import RegisterModal from "./RegisterModal";
import { useAuth } from "../../hooks/useAuth";
import "../../App.css";

// Styling for material-ui
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  form: {
    display: "flex",
    margin: "0 3%"
  },
  input: {
    background: "white",
    margin: 5,
    borderRadius: 5
  },
  button: {
    background: "#caad0fd4",
    fontSize: ".8rem",
    padding: 10,
    width: "10%"
  }
}));

function Login() {
  const classes = useStyles();
  const history = useHistory();
  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const { handleLogin } = useAuth();

  const handleChanges = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log("Login", user);
    try {
      await handleLogin(user);
      setUser({ email: "", password: "" });
      history.push("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="navbar">
      <RegisterModal />
      <form onSubmit={handleSubmit} className={classes.form}>
        <TextField
          type="email"
          id="outlined-basic"
          label="email"
          name="email"
          margin="normal"
          variant="outlined"
          value={user.email}
          onChange={handleChanges}
          className={classes.input}
          required
        />
        <TextField
          type="password"
          data-testid="loginPassword"
          id="outlined-basic"
          label="password"
          name="password"
          margin="normal"
          variant="outlined"
          value={user.password}
          onChange={handleChanges}
          className={classes.input}
          required
        />
        <Button type="submit" data-testid='signBtn' className={classes.button}>
          sign in
        </Button>
      </form>
    </div>
  );
}

export default Login;
