import React, { useEffect, useState } from "react"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import { Link } from "react-router-dom"
import firebase from "firebase"
export default function Landing() {
  const [calendars, setCalendars] = useState([])
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("calendars")
      .where("admins", "array-contains", "mdgq4B4KJjVisa8oik8aWdgNnDn1")
      .onSnapshot(snap => {
        let cals = []
        snap.docs.forEach(doc => {
          const data = doc.data()
          cals.push({ ...data, id: doc.id })
        })
        setCalendars(cals)
      })
    return () => unsubscribe()
  }, [])
  console.log(calendars)

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

  return (
    <>
      <h1>Future Landing Page</h1>
      {calendars.map(item => {
        return <div>{item.name}</div>
      })}
      <List>
        <ListItem>
          <Link to="/admin-signin">Admin Sign In</Link>
        </ListItem>
        <ListItem>
          <Link to="/admin-register">Admin Register</Link>
        </ListItem>
        <ListItem>
          <Link to="/student-register">Student Register</Link>
        </ListItem>
        <ListItem>
          <Link to="/student-signin">Student Sign In</Link>
        </ListItem>
      </List>
    </>
  )
}
