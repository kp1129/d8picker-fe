import React, { useState, useEffect } from 'react'
// import TemplateList from './TemplateList'
import axios from 'axios'
import { Typography, Paper, makeStyles } from '@material-ui/core'

const useStyles =makeStyles(theme => ({
profile: {
  color: '#fcfcac',
  fontSize: '1.3rem'
}
}))

const styles = makeStyles(theme => ({
  paper: {
    background: '#caad0fd4'
  }
}))

const Sidebar = () => {
  const classes = styles()
  // FE fix for USER GETbyID also include DELETE by id 
  // const user = localStorage.getItem('user')
  // const person = JSON.parse(user)
// console.log(person.name)

  //publish 
  return (
    <div>
      <Paper className={{classes}}>
      
       {/* <Typography variant='h4'>
      
          {person.name}'s Calendar 
        
  </Typography> */}
      </Paper>
      {/* <TemplateList/> */}
    </div>
    )
}
export default Sidebar