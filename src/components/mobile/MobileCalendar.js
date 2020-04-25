import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { Heading, Flex, Grid, Box } from '@chakra-ui/core';
import Days from './MobileDays';
import Cell from '../dashboardComponents/calendarComponents/Cell'
import useDate from '../../hooks/useDate';
import styled from 'styled-components';



const Calendar = ({ events, selected, setSelected, templateFormOpen, month, i, eventNameArr, summaries}) => {

 

  const currentDay = dayjs();
  // state to display cuurent date
  const [date, setDate] = useState(dayjs());


  
  
  const {
    currentMonth,
    currentYear,
    daysInMonth,
    weekDayOfFirstDoM,
    weekDayOfLastDoM,
    weekDays
  } = useDate(date);
  
  console.log('weekdays', weekDays)
  

  useEffect(()=>{
    setDate(month)
  },[])

    return (
      <Box id={i} className="calendar" backgroundColor="white" borderRadius="10px" style={{margin: '4%'}}>
        <Flex className="header" align="center" justify="center" py={4}>
          <MonthNameContainer>
            <Heading className="heading">{month.format('MMMM')} {date.format('YYYY')}</Heading>
          </MonthNameContainer>
        </Flex>
        <Grid
          className="weekdays-grid"
          templateColumns="repeat(7, 1fr)"
          textAlign="right"
          borderBottomWidth="1px"
          borderBottomColor="gray.200"
        >
          {weekDays.map(d => (
            <Cell
              className="weekdays-item"
              fontSize={['lg', '3xl']}
              height="auto"
              key={d}
            >
              {d}
            </Cell>
          ))}
        </Grid>
        <Grid
          className="calendar-days-grid"
          templateColumns="repeat(7, 1fr)"
          textAlign="right"
        >
          <Days
            events={events}
            date={date}
            templateFormOpen={templateFormOpen}
            selected={selected}
            setSelected={setSelected}
            weekDayOfFirstDay={weekDayOfFirstDoM}
            weekDayOfLastDay={weekDayOfLastDoM}
            daysInMonth={daysInMonth}
            currentDay={currentDay}
            currentMonth={currentMonth}
            currentYear={currentYear}
            eventNameArr={eventNameArr}
            summaries={summaries}
          />
        </Grid>
      </Box>
    );
};

export default Calendar;



const MonthNameContainer = styled.div`

  // background: red;
  width: 12%;
  text-align: center;
  box-sizing: border-box;

  @media(max-width: 1700px){
    width: 30%;
  }
  @media(max-width: 1400px){
    width: 25%;
  }
  @media(max-width: 1120px){
    width: 35%;
  }
  @media(max-width: 860px){
    width: 40%;
  }
`;