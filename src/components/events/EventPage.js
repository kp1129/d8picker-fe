import React, { useState} from 'react';
import { useAuth } from '../../contexts/auth';
import EditEventForm from './EditEventForm';
import styled from 'styled-components';
import { useToasts } from 'react-toast-notifications';


// component for event display
const EventPage = ({event}) => {
    const { api } = useAuth();
    
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
        <EventContainer>
            {isEditing 
                ? (
                    <EditEventForm 
                        event={event}
                        setIsEditing={setIsEditing}
                    />
                )
                : (
                    <div className='eventInfo' key={event.id}>
                        <EventDate>{event.start.dateTime.substring(0,10)} </EventDate>
                        <EventName>{event.title}</EventName>
                        <EventTime>{event.starttime} - {event.endtime}</EventTime>
                        <EventNotes>{event.notes}</EventNotes>
                        <ButtonsDiv>
                            <EditButton onClick={handleEditButton} >Edit</EditButton>
                            <DeleteButton onClick={handleDeleteButton}>Delete</DeleteButton>
                        </ButtonsDiv>
                    </div>
                )
        }
        </EventContainer>
    )
} 
export default EventPage;

// Styling
const EventContainer = styled.div`
  font-size: 90%;
  background: #E0E0E0;
  border: 2px solid #999898;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  color: white;
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  padding: 2% 5%;
`
const EventDate = styled.div`
    margin: 2%;
    text-align: right;
    font-style: normal;
    font-weight: 600;
    font-size: 1.5rem;
    line-height: 3rem;
    color: #999898;
`
const EventName = styled.div`
    font-style: normal;
    font-weight: bold;
    font-size: 2rem;
    line-height: 3rem;
    color: #2E5780;
`
const EventTime = styled.div`
    font-size: 1.8rem;
    line-height: 2.5rem;
    color: #2E5780;
`
const EventNotes = styled.div`
    font-size: 1.8rem;
    line-height: 2.5rem;
    color: #2E5780;
    margin-top: 5%;
`
const ButtonsDiv = styled.div`
    display: flex;
    justify-content: space-around;
    width: 100%;
    margin: 5% 2%;
    bottom: 10%;
`
const EditButton = styled.button`
    background: #FFFFFF;
    font-size: 1.8rem;
    line-height: 2.5rem;
    color: #28807D;
    padding: 2% 10%;
    border: 2px solid #28807D;
    box-sizing: border-box;
    border-radius: 15px;
`
const DeleteButton = styled.button`
    background: #28807D;
    font-size: 1.8rem;
    line-height: 2.5rem;
    color: #FFFFFF;
    padding: 2% 10%;
    border: 2px solid #28807D;
    box-sizing: border-box;
    border-radius: 15px;
`