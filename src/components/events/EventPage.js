import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/auth';
import EditEventForm from './EditEventForm';
import styled from 'styled-components';
import { useToasts } from 'react-toast-notifications';


const Event = styled.div`
  font-size: 90%;
  background: #1E85C4;
  color: white;
  border-radius: 5px;
`



// component for event display
const EventPage = ({event}) => {
    const { api } = useAuth();
    const history = useHistory();
    
    const {addToast} = useToasts();

    console.log('***', event);

    const [isEditing, setIsEditing] = useState(false);

    const handleEditButton = e => {
        e.preventDefault();
        setIsEditing(true);
    }

    const handleDeleteButton = async e => {
        e.preventDefault();
        const deleteConfirmation = window.confirm('Are you sure you want to delete the event?');
        if(deleteConfirmation) {
            await api.deleteEvent(event.id);
            addToast(`${event.title} was deleted successfully`, {
                appearance: 'info',
                autoDismiss: true,
                autoDismissTimeout: 6000
               })
        }
    }

    return (
        <Event>
            <div className='event-name'>
                <h1 style={{fontSize: '3rem', fontWeight: 'bold'}}>Event Page</h1>
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
                        <h1 style={{fontSize: '2rem', fontWeight: 'bold'}}>{event.title}</h1>
                        <h2 style={{fontSize: '2rem', fontWeight: 'bold'}}>{event.notes}</h2>
                        <h2 style={{fontSize: '1.5rem', fontWeight: 'bold'}}>Start time: {event.starttime}</h2>
                        <h2 style={{fontSize: '1.5rem', fontWeight: 'bold'}}>End time: {event.endtime}</h2>
                        <div className='button-div' style={{fontSize: '1rem', fontWeight: 'bold', width: '70%', margin: 'auto', padding: '2%', display:'flex', justifyContent: 'center'}}>
                            <button style={{fontSize: '1rem', fontWeight: 'bold', backgroundColor: 'white', color: '#1E85C4', margin: '4%', padding: '2%', width: '40%'}} onClick={handleEditButton} >Edit</button>
                            <button style={{fontSize: '1rem', fontWeight: 'bold', backgroundColor: 'red', color: 'white', margin: '4%', padding: '2%', width: '40%'}} onClick={handleDeleteButton}>Delete</button>
                        </div>
                    </div>
                )
        }
        </Event>
    )
} 
export default EventPage;