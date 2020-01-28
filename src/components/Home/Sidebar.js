import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Typography, makeStyles } from '@material-ui/core'

const useStyles =makeStyles(theme => ({
profile: {
  color: '#fcfcac',
  fontSize: '1.3rem'
}
}))

const Sidebar = () => {
  const classes = useStyles()
  const [user, setUser] = useState('Bob')

  useEffect(() => {
    axios.get('')
    .then( res => {  
      console.log('res.data:', res.data)
      //setUser(res.data)
    })
    .catch( err =>{console.log(err)})
  },[])

  return (
    <div>
        <Typography variant='h3'className={classes.profile} >
          {user}
          </Typography>
        
    </div>
    )
}
export default Sidebar