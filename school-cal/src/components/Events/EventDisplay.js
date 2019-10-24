import React, { useState, useEffect } from 'react';
import firebase, { db } from '../../config/firebase/index';
import { AuthContext } from "../../contexts/auth/authState"

import './EventDisplay.css'


const EventDisplay = () => {
    const initialValue = [
        {
            id: 1,
            date:'',
            description:'',
            location:'',
            name:'',
            uid:0
        },
    ]
    const [event, setEvent] = useState(initialValue);
    // const { currentUser } = useContext(AuthContext)


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
        //         setevent(snapshot.docs.map(doc => doc.data()))
        //     })
        //     .catch(err=> console.log('something is up', err))

    },[])


    const doDelete = id => {
        console.log('delete')
        setEvent(event.filter(event => event.id !== id))
    }
    return (

        <div className='event-display-container'>
            <h1>Events Go HERE</h1>
            <ul 
                className='event-display-cards'
                >
                {event.map(event => (
                    <li
                        className='event-display-card'
                        key={event.id}
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
                            onClick={() => doDelete(event.id)}
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