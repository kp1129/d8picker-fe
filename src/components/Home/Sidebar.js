import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Typography, Paper } from '@material-ui/core'


const Sidebar = () => {
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
      <Paper>
        <Typography variant='h1'>
          {user.username}
        </Typography>
      </Paper>
    </div>
    )
}
export default Sidebar