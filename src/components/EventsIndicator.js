import React from 'react';
import dayjs from 'dayjs';

import { Icon } from '@chakra-ui/core';

// Displays circle icon if day has an event
const EventIndicator = ({ event, day, currentMonth, currentYear }) => {
  // const hasEvents =
  //   day === dayjs(event.start.dateTime).date() &&
  //   currentMonth === dayjs(event.start.dateTime).month() &&
  //   currentYear === dayjs(event.start.dateTime).year();

  let hasEvents;
  if(event.start.dateTime){
    hasEvents =
    day === dayjs(event.start.dateTime).date() &&
    currentMonth === dayjs(event.start.dateTime).month() &&
    currentYear === dayjs(event.start.dateTime).year();
  } else if (event.start.date){
    hasEvents =
    day === dayjs(event.start.date).date() &&
    currentMonth === dayjs(event.start.date).month() &&
    currentYear === dayjs(event.start.date).year();
  }
  

  return hasEvents ? (
    <>
      <Icon name="circle" fill="brand.blue_accent" />
      <div>{event.summary}</div>
    </>
  ) : null;
};

export default EventIndicator;
