import React, { useState, useEffect } from 'react'
import axios from 'axios'


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
      {user.map(person =>{
        <h1>
          {person.username}
        </h1>
      })} 
    </div>
    )
}
export default Sidebar