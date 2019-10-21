import React, { useState, useEffect } from 'react';
import EventCard from './EventCard';

const EventDisplay = () => {

    useEffect(() => {


    },[])

    const [events, setEvents] = useState([]);

    return (
        <>
        {events.map(item => <EventCard info={item}/>)}
        </>
    )
}

export default EventDisplay;