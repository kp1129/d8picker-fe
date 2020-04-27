import React from 'react';
import { Flex, Box } from '@chakra-ui/core';
import Cell from '../dashboardComponents/calendarComponents/Cell'
import EventsIndicator from './MobileEventIndicator'
import useDate from '../../hooks/useDate'
import dayjs from 'dayjs';

   




const Day = ({ events, date, isPicked, handleSelected, isToday, day, i, eventDatesArr, summaries }) => {


  //checks the current Day's date (being mapped by parent Days) matches a date of an event from the google calendar api. If so, render an event indicator for each matching event.
  const matchTheEvents = () => {
    
    let formattedDate = `${currentYear}-${currentMonth + 1 < 10 ? 0 : ''}${currentMonth +
      1}-${day < 10 ? 0 : ''}${day}`;
    if(eventDatesArr.includes(formattedDate)){
      let eventSummary;
      return eventDatesArr.map((eventName, i) => {
        if(eventName === formattedDate){
          eventSummary = summaries[i];
          return <EventsIndicator
                key={i}
                event={formattedDate}
                eventSummary={eventSummary}
                fontSize="2px"
              />
        }
      }); 
    }
  }

  


  const {
    currentMonth,
    currentYear,
  } = useDate(date);

  
  //sets the background color of the calendar day when clicked in date selection mode to red if in the past or blue if present or future so it is clear to the user which dates an event can be added to.
  const setBackgroundColor = ()=>{

      if(isPicked === true){  
            let index = i+1;
            let newDate = new Date()
            let thisYear = newDate.getYear() + 1900;
          //if the date is in the past (the month before this month, but still in the current year) and any date in that month is clicked, make it red
          if(currentMonth < dayjs().$M && currentYear === thisYear){
              return '#FC8181'
          } 
          //if the date is in the current month and the current year but the day is before today, and it is clicked, make it red
          else if (date.$D > index && currentMonth === dayjs().$M && currentYear === thisYear){
                return '#FC8181'
          //otherwise, given current functionality, it is possible to add an event to that day so make it blue
          }else {
              return 'brand.blue_primary';
          }
      }

  }



  return (
          <Cell
            className="calendar-days-item"
            borderBottomWidth="10px"
            borderBottomColor="gray.200"
            height="120px"
            key={i}
            width={window.innerWidth/8}
          >
            <Flex
              direction="column"
              align="center"
              justify="space-between"
              h="100%"
              py={[1, 8]}
              backgroundColor={setBackgroundColor()}
              color={isPicked ? 'white' : 'inherit'}
              onClick={()=>{
                handleSelected();
              }}
            >
              <Box
                as="span"
                fontSize={['xs', 'm']}
                fontWeight={700}
                color={isToday ? 'brand.blue_primary' : 'inherit'}
              >
                {day}
              </Box>
              <div>
                {eventDatesArr && matchTheEvents()}
              </div>
            </Flex>
          </Cell>
        );
}
export default Day;
