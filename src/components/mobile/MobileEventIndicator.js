import React from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';

import { Icon } from '@chakra-ui/core';

const Event = styled.div`
  font-size: 1.25rem;
`

// Displays circle icon if day has an event
const EventIndicator = ({ event, day, currentMonth, currentYear, eventSummary}) => {
 
  
  return event ? (
    <>
      <Icon name="circle" fill="brand.blue_accent" />
      <Event>{eventSummary}</Event>
    </>
  ) : null;
};

export default EventIndicator;
