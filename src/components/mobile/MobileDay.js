import React from 'react';
import { Flex, Box } from '@chakra-ui/core';
import Cell from '../dashboardComponents/calendarComponents/Cell'
import EventsIndicator from './MobileEventIndicator'
import useDate from '../../hooks/useDate'
import dayjs from 'dayjs';

   

const Day = ({ events, date, isPicked, handleSelected, isToday, day, i, eventNameArr }) => {
  const {
    currentMonth,
    currentYear,
  } = useDate(date);

  
  const setBackgroundColor = ()=>{
      if(isPicked === true){
            let index = i+1;
            let newDate = new Date()
            let str = newDate.toUTCString();
            // console.log(str)
          if(currentMonth < dayjs().$M){
              return '#FC8181'
          } 
          else if (date.$D > index && currentMonth === dayjs().$M){
                return '#FC8181'
          }else {
              return 'brand.blue_primary';
          }
      }

  }

  const mapTheEvents = (eventNameArr) => {
    let formattedDate = `${currentYear}-${currentMonth + 1 < 10 ? 0 : ''}${currentMonth +
      1}-${day < 10 ? 0 : ''}${day}`;
    if(eventNameArr.includes(formattedDate)){
      // let formattedEvent = event[i].start.dateTime.substring(0,10)
      return <EventsIndicator
            key={formattedDate}
            event={formattedDate}
            events={events}
            day={day}
            currentMonth={currentMonth}
            currentYear={currentYear}
            fontSize="2px"
          />
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
            //   backgroundColor={isPicked ? 'brand.blue_primary' : 'inherit'}
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
              {/* {events &&
                events.map(event => (
                  <div key={event.id}>
                    <EventsIndicator
                      key={event.id}
                      event={event}
                      day={day}
                      currentMonth={currentMonth}
                      currentYear={currentYear}
                      fontSize="2px"
                    />
                  </div>
                ))} */}
                {eventNameArr && mapTheEvents(eventNameArr)}
            </Flex>
          </Cell>
        );
}

export default Day;
