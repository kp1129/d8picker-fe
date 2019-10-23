import React, { useState, useEffect } from 'react';
import firebase, { db } from '../../config/firebase/index'
// import EventCard from './EventCard';
import './EventDisplay.css'

const EventDisplay = () => {
    const [data, setData] = useState([]);

    const eventsDbRef = db
        .collection("calendars")
        .doc("hURNrIybLCJE0dJ9GqKM")
        .collection("events");
    //keep in state first calendar as default, have dropdown select for individual calendars

    useEffect(() => {
        eventsDbRef
            .get()
            .then(snapshot => {
                snapshot.docs.map(doc => console.log(doc.id))
                setData(snapshot.docs.map(doc => doc.data()))
            })
            .catch(err=> console.log('something is up', err))
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
                        <br />
                        When: {item.date}
                        <br />
                        description: {item.description}
                        <br />
                        Location: {item.location}
                        <br />
                        Name: {item.name}
                        <br />
                        User ID: {item.uid}
                        <button>X</button>
                    </li>
                ))}
            </ul>

        </div>
    )
}

export default EventDisplay;