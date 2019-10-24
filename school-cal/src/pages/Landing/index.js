import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import firebase from "firebase"
import LandingNavbar from './LandingNavbar'

import AppleCal from '../../assets/images/apple-cal.jpg'
import '../../index.css'

<<<<<<< HEAD
  // useEffect(() => {
  //   firebase
  //     .firestore()
  //     .collection("calendars")
  //     .doc("")
  //     .collection("events")
  //     .get()
  //     .then(docs => {
  //       console.log(docs)
  //     })
  // }, [])
=======

export default function Landing() {
>>>>>>> 3608fa0e2887a33ec5e6b14ec28201ae2a081425

  return (
     <div className='container'>
     <LandingNavbar/>
     <div className='landing-grid-container'><img
            className='landing-img'
            src={AppleCal}
            alt={"desktopCalendar"}
          /><Link className='landing-link' to='/sign-in'>Sign In</Link></div>
           <div><Link className='landing-link2' to='/register'>Sign Up</Link></div>
     </div>
        

  )
}
