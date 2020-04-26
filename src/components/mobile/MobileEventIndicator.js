import React, {useState, useEffect} from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';
import { Icon } from '@chakra-ui/core';

const EventContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;


const Event = styled.div`
  font-size: 90%;
`


// Displays circle icon if day has an event
const EventIndicator = ({ event, eventSummary}) => {
 
  const [summ, setSumm] = useState("")
  const [show, setShow] = useState(true);


  useEffect(()=>{
    if(window.innerWidth >=700){
      setShow(true)
      eventSummary.length > 5 ? setSumm(eventSummary.substring(0,5)) : setSumm(eventSummary)
    } else {
      setShow(false)
    }
  },[])
  
  return event ? (
    <EventContainer>
      <Icon name="circle" fill="brand.blue_accent" />
      {show && <Event>{summ}</Event>}
    </EventContainer>
  ) : null;
};

export default EventIndicator;



