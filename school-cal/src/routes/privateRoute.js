/* eslint-disable */

import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "../contexts/auth/authState";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useContext(AuthContext);
  console.log("user ", currentUser); 

  return (
    <Route
      {...rest}
      render={props => {
        if (currentUser) {
          return <Component {...props} />;
        }
        return <Redirect to={"/"} />;
      }}
    />
  );
};

export default PrivateRoute;
