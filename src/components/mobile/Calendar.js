import React, { useState, useEffect, useRef } from 'react';

import dayjs from 'dayjs';
import { Heading, Flex, Grid, Box, IconButton } from '@chakra-ui/core';
import Days from '../dashboardComponents/calendarComponents/Days';
import Cell from '../dashboardComponents/calendarComponents/Cell';
import useDate from '../../hooks/useDate';
import styled from 'styled-components';


const scrollToRef = (ref, penultMonth) => {
    // window.scrollTo(0, ref.current.offsetTop); 
    window.addEventListener('scroll', ()=>{
        console.log('ref.current.offsetTop', ref.current.offsetTop)
        console.log('y', window.scrollY)
        if (window.scrollY > ref.current.offsetTop){
            console.log(ref.current.innerText.substring(0,3));
            console.log('penultMonth', penultMonth)

        }
    })
    return window.removeEventListener('scroll', ()=>console.log('removed'))
    } 
const useMountEffect = (fun) => useEffect(fun, [])

const Calendar = ({ events, selected, setSelected, templateFormOpen, month, penultMonth }) => {
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

  const handlePrev = () => {
    setDate(date.subtract(1, 'month'));
  };


  const handleNext = () => {
    setDate(date.add(1, 'month'));
  };
  
  useEffect(()=>{
    setDate(month)
  },[])

const myRef = useRef(null)

    useMountEffect(() => scrollToRef(myRef, penultMonth))
  

  return (
    <Box 
    ref={myRef}
    
    // onClick={()=>scrollToRef(myRef)} 

      
      
      className="calendar" backgroundColor="white" borderRadius="10px">
      <Flex className="header" align="center" justify="center" py={4}>
        <IconButton
          w="2em"
          aria-label="Previous Month"
          icon="prev"
          backgroundColor="transparent"
          size="lg"
          onClick={handlePrev}
        />
        <MonthNameContainer>
          {/* <Heading className="heading">{date.format('MMMM')} {date.format('YYYY')}</Heading> */}
          <Heading className="heading">{month.format('MMMM')} {date.format('YYYY')}</Heading>
        </MonthNameContainer>

        <IconButton
          aria-label="Next Month"
          icon="next"
          backgroundColor="transparent"
          size="lg"
          onClick={handleNext}
        />
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