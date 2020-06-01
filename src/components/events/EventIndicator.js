import React, {useState, useEffect, useContext} from 'react';
import { useAuth } from '../../contexts/auth';
import {DashboardContext} from '../../contexts/Contexts'
import styled from 'styled-components';



// Displays blue box with name of event
const EventIndicator = ({ event, eventDate, eventTitle}) => {
  const [title, setTitle] = useState("")
  const {setEvent, setEventDisplay} = useContext(DashboardContext);

  //if name of event is greater than 5 characters, shorten it to fit within a day box at mobile size
  useEffect(()=>{
      eventTitle.length > 5 ? setTitle(eventTitle.substring(0,5)) : setTitle(eventTitle)
  },[eventTitle])

  const loadEventComponent = e => {
    e.preventDefault();
    setEventDisplay(true);
    event.title = event.summary;
    event.notes = event.description;
    event.date = event.start.dateTime.substring(0,10);
    event.starttime = event.start.dateTime.substring(11,19);
    event.endtime = event.end.dateTime.substring(11,19);
    setEvent(event);
  }
  
  return eventDate ? (
    <EventContainer>
      <Event>
        <button onClick={loadEventComponent}>{title}</button> 
      </Event>
    </EventContainer>
  ) : null;
};

export default EventIndicator;

const EventContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  // width: 100%;
  margin: 2% 0
`;


const Event = styled.div`
  font-size: 90%;
  background: #1E85C4;
  color: white;
  border-radius: 5px;
`



