import React, { useState, useEffect } from 'react'
// import Template from './Template'
import axios from 'axios'
import { Typography, Paper, makeStyles } from '@material-ui/core'


const styles = makeStyles(theme => ({
  paper: {
    background: '#caad0fd4'
  }
}))

const Sidebar = () => {
  const classes = styles()
  const [user, setUser] = useState('Bob')


  //load user name into state
  useEffect(() => {
    axios.get('')
    .then( res => {  
      console.log('res.data:', res.data)
      //setUser(res.data)
    })
    .catch( err =>{console.log(err)})
  },[])


  //publish 
  return (
    <div>
      <Paper className={{classes.paper}}>
        <Typography variant='h1'>
          {user.username}
        </Typography>
      </Paper>
      {/*<Template/> */}
    </div>
    )
}
export default Sidebar