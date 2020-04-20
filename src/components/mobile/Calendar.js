import React, { useState, useEffect, useRef } from 'react';

import dayjs from 'dayjs';
import { Heading, Flex, Grid, Box, IconButton } from '@chakra-ui/core';
import Days from '../dashboardComponents/calendarComponents/Days';
import Cell from '../dashboardComponents/calendarComponents/Cell';
import useDate from '../../hooks/useDate';
import styled from 'styled-components';

//for some reason, a regular useEffect doesn't work but putting this out here like this does
const useMountEffect = (fun, numOfMonths) => useEffect(fun, [numOfMonths])

const Calendar = ({ events, selected, setSelected, templateFormOpen, month,  monthList, setMonths, numOfMonths, setNumOfMonths, i, reloadMonths, setReloadMonths, setStartMonth, startMonth, visibleMonths, setVisibleMonths}) => {

  const currentDay = dayjs();
  // state to display cuurent date
  const [date, setDate] = useState(dayjs());

  //define a month when user scrolls to it will trigger load of additional months (in this case somewhere in the middle of the year)
  const [reloadMonth, setReloadMonth] = useState(monthList[monthList.length-6].format('MMMM'))



  const {
    currentMonth,
    currentYear,
    daysInMonth,
    weekDayOfFirstDoM,
    weekDayOfLastDoM,
    weekDays
  } = useDate(date);

 
  const scrollToRef = (ref) => {
    // window.addEventListener('scroll', ()=>{

       if(ref !==null){
         //needs a setTimeout because ref and virtual dom don't always agree if ref exists or not
        setTimeout(()=>{
          
        let reloadDay = monthList[monthList.length-6].$d
        console.log('dimensions', ref.current.getBoundingClientRect().height)
        
        //if the user scrolls past a month whose name matches the reloadMonth, load more months
        
        //grabs the year of the current ref from it's text and converts to a number for comparison
        let yearIndex = ref.current.innerText.match(/[0-9][0-9][0-9]|[0-9]/).index;
        let yearText = ref.current.innerText.substring(yearIndex, yearIndex+4);
        let yearNum = Number(yearText)
        console.log('scrollY', window.scrollY, 'ref.current', ref.current.offsetTop)
        //checks what month we've scrolled past and if the month and year names match our reloadMonth
        if (window.scrollY > ref.current.offsetTop && ref.current.innerText.substring(0,3) === reloadMonth.substring(0,3) && yearNum === month.$y){
            //if yes, load more months
            setNumOfMonths(numOfMonths + 12)
            
            //check dimensions of calendars above and subtract when changing start and end


            // setNumOfMonths(numOfMonths + 12)
            // setStartMonth(startMonth + 12)

            // window.scrollTo(0, 0);






            // console.log('num of months before', numOfMonths)
            // if(!reloadMonths.includes(reloadDay)){
            //   setNumOfMonths(numOfMonths + 12)
            //   setReloadMonths([...reloadMonths, reloadDay])
            //   // setVisibleMonths({start: numOfMonths, end: numOfMonths+12})
            // }
                // setStartMonth(startMonth + 12)
              

        }

        }, 350)
       } else {
         console.log("LOADING")
       }
    // })
    // return window.removeEventListener('scroll', ()=>console.log('removed'))
    }
  
  

  useEffect(()=>{
    setDate(month)
  },[monthList])

  const myRef = useRef("")
  useMountEffect(() => scrollToRef(myRef),[numOfMonths])
  
  

  // if(i >= visibleMonths.start && i < visibleMonths.end){
    return (
      <Box ref={myRef} id={i} className="calendar" backgroundColor="white" borderRadius="10px">
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
  // } else {
  //   return(
  //     <div style={{height: "817px"}} ref={myRef}>
  //        <Heading className="heading">{month.format('MMMM')} {date.format('YYYY')}</Heading>
  //     </div>
  //   )
  // }
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