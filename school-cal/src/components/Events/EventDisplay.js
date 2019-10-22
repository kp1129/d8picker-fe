import React, { useState, useEffect } from 'react';
import firebase, { db } from '../../firebase/'
// import EventCard from './EventCard';
import './EventDisplay.css'

const EventDisplay = () => {

    useEffect(() => {
        db
            .collection("calendars")
            .doc("aWBlKnc7wrTCOQenDfaA")
            .collection("events")
            .get()
            .then(snapshot => {
                snapshot.docs.map(doc => console.log(doc.data()))
            })
    },[])

    // const [events, setEvents] = useState([]);
    // const async snapshot = await firebase.firebase().collection('calendars').doc('aWBlKnc7wrTCOQenDfaA').collection('events').get()
    // console.log('this is the snapshop', snapshot)

    // return snapshot.docs.map(doc => doc.data())
    return (
        <div className='event-display-container'>
            <h1>Events Go HERE</h1>

        </div>
    )
}

export default EventDisplay;