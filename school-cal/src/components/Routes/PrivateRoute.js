import React, { useContext } from "react"
import { Redirect, Route } from "react-router-dom"
import { AuthContext } from "../../contexts/auth/authState"

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useContext(AuthContext)

  return (
    <Route
      {...rest}
      render={props => {
        if (currentUser) {
          return <Component {...props} />
        }
        return <Redirect to={"/sign-in"} />
      }}
    />
  )
}

export default PrivateRoute
