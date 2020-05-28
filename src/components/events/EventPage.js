import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/auth';
import EditEventForm from './EditEventForm';
import styled from 'styled-components';


const Event = styled.div`
  font-size: 90%;
  background: #1E85C4;
  color: white;
  border-radius: 5px;
`



// component for event display
const EventPage = () => {
    const { api } = useAuth();

    const [event, setEvent] = useState({});
    const {eventId} = useParams();

    useEffect(() => {
        api.getEvent(eventId)
            .then(response => {
                console.log('fetching event', response)
                response.title = response.summary;
                response.notes = response.description;
                response.date = response.start.dateTime.substring(0,10);
                response.starttime = response.start.dateTime.substring(11,19);
                response.endtime = response.end.dateTime.substring(11,19);
                setEvent(response);
            })
    }, [eventId]);


    console.log('***', eventId, event);

    const [isEditing, setIsEditing] = useState(false);

    const handleEditButton = e => {
        e.preventDefault();
        setIsEditing(true);
    }

    const handleDeleteButton = async e => {
        e.preventDefault();
        await alert('Are you sure you want to delete the event?');
        console.log('event was deleted successfully');
    }

    return (
        <Event>
            <div className='event-name'>
                <h1>Event Page</h1>
            </div>
            {isEditing 
                ? (
                    <EditEventForm 
                        event={event}
                        setIsEditing={setIsEditing}
                    />
                )
                : (
                    <div className='eventInfo' key={event.id}>
                        <h1>{event.title}</h1>
                        <h2>{event.notes}</h2>
                        <h2>Start time: {event.starttime}</h2>
                        <h2>End time: {event.endtime}</h2>
                        <button onClick={handleEditButton}>Edit</button>
                        <button onClick={handleDeleteButton}>Delete</button>
                    </div>
                )
        }
        </Event>
    )
} 
export default EventPage;