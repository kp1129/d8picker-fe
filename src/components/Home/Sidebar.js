import React, { useState, useEffect } from 'react'
import TemplateList from './TemplateList'
import axios from 'axios'
import { Typography, Paper, makeStyles } from '@material-ui/core'


const styles = makeStyles(theme => ({
  paper: {
    background: '#caad0fd4'
  }
}))

const Sidebar = () => {
  const classes = styles()
  const [user, setUser] = useState({
      name: 'Bob',
      id:1,
    })


  //load user name into state
  useEffect(() => {
    axios.get('')
    .then( res => {  
      console.log('res.data:', res.data)
      //setUser(res.data)
    })
    .catch(err =>{console.log(err)})
  },[])


  //publish 
  return (
    <div>
      <Paper className={{classes}}>
        <Typography variant='h1'>
          {user.name} is number {user.id} in my book
        </Typography>
      </Paper>
      <TemplateList/>
    </div>
    )
}
export default Sidebar