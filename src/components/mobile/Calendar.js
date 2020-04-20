import React, { useState, useEffect, useRef } from 'react';

import dayjs from 'dayjs';
import { Heading, Flex, Grid, Box, IconButton } from '@chakra-ui/core';
import Days from '../dashboardComponents/calendarComponents/Days';
import Cell from '../dashboardComponents/calendarComponents/Cell';
import useDate from '../../hooks/useDate';
import styled from 'styled-components';


const useMountEffect = (fun, numOfMonths) => useEffect(fun, [numOfMonths])

const Calendar = ({ events, selected, setSelected, templateFormOpen, month,  monthList, setMonths, numOfMonths, setNumOfMonths, i}) => {

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

 
  const scrollToRef = (ref) => {
    window.addEventListener('scroll', ()=>{
        //define a month when user scrolls to it will trigger load of additional months (in this case second to last in array)
        // console.log('ref', ref)
        let reloadMonth = monthList[monthList.length-3].format('MMMM')
        // console.log('reloadMonth', reloadMonth, 'window.scrollY', window.scrollY, 'ref.current.offsetTop', ref.current.offsetTop)
        //if the user scrolls past a month whose name matches the reloadMonth, load more months
        // let thisYear = date.format('YYYY');
        // let yearText = ref.current.innerText.match(/[0-9][0-9][0-9]|[0-9]/).index;
        // console.log('yearText', ref.current.innerText.substring(yearText, yearText+4))

        setTimeout(()=>{console.log('current ref', ref.current)},1000)
        if (window.scrollY > ref.current.offsetTop && ref.current.innerText.substring(0,3) === reloadMonth.substring(0,3)){
            //load more months
            // if(numOfMonths >= 12){
            //   setNumOfMonths(0);
            // } else {
              setNumOfMonths(numOfMonths + 12)
            // }

        }
    })
    return window.removeEventListener('scroll', ()=>console.log('removed'))
    }
  
  

  useEffect(()=>{
    setDate(month)
  },[monthList])

const myRef = useRef(null)

    useMountEffect(() => scrollToRef(myRef))
  

  return (
    <Box 
    ref={myRef}
    id={i}
    // onClick={()=>scrollToRef(myRef)} 

      
      
      className="calendar" backgroundColor="white" borderRadius="10px">
      <Flex className="header" align="center" justify="center" py={4}>
        <MonthNameContainer>
          {/* <Heading className="heading">{date.format('MMMM')} {date.format('YYYY')}</Heading> */}
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