import React, { useState, useEffect } from 'react';
import firebase, { db } from '../../config/firebase/index'
// import EventCard from './EventCard';
import './EventDisplay.css'


const EventDisplay = () => {
    const initialValue = [
        {
            date:'',
            description:'',
            location:'',
            name:'',
            uid:0
        }
    ]
    const [data, setData] = useState(initialValue);

    const eventsDbRef = db
        .collection("calendars")
        .doc("hURNrIybLCJE0dJ9GqKM")
        .collection("events");
    //keep in state first calendar as default, have dropdown select for individual calendars

    useEffect(() => {
        // eventsDbRef
        //     .get()
        //     .then(snapshot => {
        //         snapshot.docs.map(doc => console.log(doc.id))
        //         setData(snapshot.docs.map(doc => doc.data()))
        //     })
        //     .catch(err=> console.log('something is up', err))
        const results = [
            ...data
        ]
        console.log(results)
    },[])


    // const doDelete = id => {
    //     firebase
    //     .firestore()
    //     .collection("calendars")
    //     .doc('aWBlKnc7wrTCOQenDfaA')
    //     .collection('events')
        
    //     .delete()
    // }
    return (

        <div className='event-display-container'>
            <h1>Events Go HERE</h1>
            <ul 
                className='event-display-cards'
                >
                {data.map(event => (
                    <li
                        className='event-display-card'
                        key={event.events}
                    >
                        <br />
                        When: {event.date}
                        <br />
                        description: {event.description}
                        <br />
                        Location: {event.location}
                        <br />
                        Name: {event.name}
                        <br />
                        User ID: {event.uid}
                        <button
                            // onClick={}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>

        </div>
    )
}

export default EventDisplay;