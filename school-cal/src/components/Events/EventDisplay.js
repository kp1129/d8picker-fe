import React, { useState, useEffect } from 'react';
import firebase, { db } from '../../firebase/'
// import EventCard from './EventCard';
import './EventDisplay.css'


const EventDisplay = () => {
    const [data, setData] = useState([]);

    const eventsDbRef = db
        .collection("calendars")
        .doc("aWBlKnc7wrTCOQenDfaA")
        .collection("events");

    useEffect(() => {
        eventsDbRef
            .get()
            .then(snapshot => {
                snapshot.docs.map(doc => console.log(doc.id))
                setData(snapshot.docs.map(doc => doc.data()))
            })
            .catch(err=> console.log('something is up', err))
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
                {data.map(item => (
                    <li
                        className='event-display-card'
                        key={item.events}
                    
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