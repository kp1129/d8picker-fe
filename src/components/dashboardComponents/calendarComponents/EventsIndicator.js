import React from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';
import { Icon } from '@chakra-ui/core';

// Displays circle icon if day has an event
const EventIndicator = ({ event, day, currentMonth, currentYear }) => {

  let hasEvents;
  if(event.start.dateTime || event.start.date){
    hasEvents =
    day === dayjs(event.start.dateTime).date() &&
    currentMonth === dayjs(event.start.dateTime).month() &&
    currentYear === dayjs(event.start.dateTime).year();
  } 
  
  return hasEvents ? (
    <>
      <Icon name="circle" fill="brand.blue_accent" />
      <Event>{event.summary}</Event>
    </>
  ) : null;
};

export default EventIndicator;

const Event = styled.div`
  font-size: 1.25rem;
`
