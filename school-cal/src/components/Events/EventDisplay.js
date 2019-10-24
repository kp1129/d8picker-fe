import React, { useState, useEffect } from 'react';
import firebase, { db } from '../../config/firebase/index'
// import EventCard from './EventCard';
import './EventDisplay.css'

const EventDisplay = () => {
    const [data, setData] = useState([]);
    const [calendars, setCalendars] = useState([]);
    const [admins, setAdmins] = useState([]);

    const userID = firebase.auth().currentUser.uid;

    const calDbRef = db
        .collection("calendars")
        .where("admins", "array-contains", userID);

    calDbRef
        .get()
        .then(snapshot => {
            snapshot.docs.map(doc => console.log('primarycal', doc.data()))
        })

    console.log('primarycal', calDbRef);

    const eventsDbRef = db
        .collection("calendars")
        .doc("hURNrIybLCJE0dJ9GqKM")
        .collection("events");
    //keep in state first calendar as default, have dropdown select for individual calendars

    useEffect(() => {
        eventsDbRef
            .onSnapshot(doc => {
                setData(doc.docs.map(item => console.log(item.data())))
                setData(doc.docs.map(item => item.data()))
            })
    },[]) //have an empty array, do .map then push to empty array, set data to array

    // useEffect(() => {
    //     eventsDbRef
    //         .onSnapshot(
    //             // doc => {
    //             //     console.log('docs', doc)
    //             // },
    //             // err => {
    //             //     console.log('error', err)
    //             // }
    //         )
    // },[])

    const deleteEvent = () => {

    }

    return (

        <div className='event-display-container'>
            <h1>Events Go HERE</h1>
            <ul 
                className='event-display-cards'
                >
                {data.map(item => (
                    <li
                        className='event-display-card'
                        key={item.date}
                    >
                        {/* <br />
                        When: {item.date} */}
                        <br />
                        description: {item.description}
                        <br />
                        Location: {item.location}
                        <br />
                        Name: {item.name}
                        {/* <br />
                        User ID: {item.uid}
                        <button>X</button> */}
                    </li>
                ))}
            </ul>

        </div>
    )
}

export default EventDisplay;