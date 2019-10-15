import React , {useContext} from "react" 
import {Redirect , Route} from "react-router-dom"
import db from '../firebase/index'

const PrivateRoute = ({component : Component, ...rest}) => {  
    //const {ifUserCurrent} = useContext()  
    console.log(db);

  return (
      <div>
        <h1>Private Route</h1>
      </div>
      //<Route 
    //    {...rest} 
    //    render = {props => 
    //     !!ifUserCurrent ? (
    //      <Component {...props}/> 
    //     ) : (
    //     <Redirect to = {"login"} />
    //     )
    // } 
   // />
  )
} 

export default PrivateRoute;
