import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";

const AuthContext = React.createContext();

export const reducer = (state, action) => {
  switch (action.type) {
    case "REGISTER_SUCCESS":
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      state.registered = true;
      state.isAuthenticated = state.registered;
      return {
        ...state,
        ...action.payload
      };
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      state.isAuthenticated = true;
      return {
        ...state,
        ...action.payload
      };
    case "AUTH_ERR":
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        user: null
      };
    // default
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const initialState = {
    isAuthenticated: localStorage.getItem("token") ? true : false,
    registered: false,
    user: localStorage.getItem("user") || null,
    token: localStorage.getItem("token") || null
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleLogin = async values => {
    try {
      // Test endpoint
      const response = await axios.post(
        "https://d8picker.herokuapp.com/api/auth/login",
        values
      );

      console.log("login", response.data);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data
      });
    } catch (err) {
      console.log(err.response);
      dispatch({
        type: "AUTH_ERR",
        payload: err.response
      });
    }
  };

  const handleRegister = async values => {
    try {
      // Test endpoint
      const response = await axios.post(
        "https://d8picker.herokuapp.com/api/auth/register",
        values
      );
      console.log(response.data);
      dispatch({
        type: "REGISTER_SUCCESS",
        payload: response.data
      });
    } catch (err) {
      console.log(err.response);
      dispatch({
        type: "AUTH_ERR",
        payload: err.response
      });
    }
  };

  const handleLogout = () => dispatch({ type: "LOGOUT" });

  useEffect(() => {
    console.log("token: ", state.token);
  }, [state.token]);

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        registered: state.registered,
        user: state.user,
        handleLogin,
        handleRegister,
        handleLogout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
