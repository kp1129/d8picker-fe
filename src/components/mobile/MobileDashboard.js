import React, { useState, useEffect, useContext} from 'react';
import {MobileContext, MobileDashboardContext} from '../../contexts/MobileContexts';
import { Box, Grid } from '@chakra-ui/core';
import { useAuth } from '../../contexts/auth';
import dayjs from 'dayjs';
import ConfirmDatesBtn from './ConfirmDatesBtn'
import InfiniteCal from './InfiniteCal'
import Cell from '../dashboardComponents/calendarComponents/Cell'
import styled from 'styled-components'
import Hamburger from './Hamburger/TopNav'
import axios from 'axios'


const getTemplateList = async ({ googleId }) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_ENDPOINT_URL}/api/template/${googleId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};


const Dashboard = () => {
  
 
  const {setSelected, toggleNav, setToggleNav, setNavState, formOpen} = useContext(MobileContext);

  //google OAuth2
  const { googleApi, api } = useAuth();
  const { currentUser } = googleApi;




  // state for full user objects from calendar api
  const [events, setEvents] = useState(null);

  //array of only the formatted date strings of events from calendar api
  const [eventDatesArr, setEventDatesArr] = useState([])
  
  //array of only event name strings from calendar api
  const [summaries, setSummaries] = useState([]);

  //array of weekdays which sits at top of calendar
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  
  
  // get events from api and set to state
  useEffect(() => {
    (async () => {
      try {
        const data = await api.listEvents();
        setEvents(data);
        let summariesArr = [];
        let formattedEvents = data.map(event=>{
          summariesArr.push(event.summary)
          return event.start.dateTime.substring(0,10)
        })
        setSummaries(summariesArr)
        setEventDatesArr(formattedEvents);


      } catch (error) {
        console.log(error);
      }
    })();
  }, [api]);

  


  //helper function to loop through and create months in the future based on number passed into the function
  const nextMonth = (numOfMonths) => {
    let arr = [];
    for(let i=0; i<numOfMonths; i++){
      arr.push(dayjs().add(i,'month'));
    }
    return arr;
  }

//sets array of months based on number passed in to give to the infinite list as a starting number (items name chosen as suggested by react-window examples)
const [items, setItems] = useState(nextMonth(50));

  return (
    <>
    {toggleNav && <Hamburger />}
    {/*toggle nav toggles off nav to indicate in date selection mode, this changes the header to reflect this*/}
    {toggleNav === false && <Container>
          <Cancel onClick={()=>{
            setToggleNav(true);
            setNavState(1)
            setSelected([])
          }}>&#60; Back</Cancel>
          <Title>Select Dates</Title>
          <BtnDiv>
          </BtnDiv>
      </Container>}
    <Box
      maxHeight="100vh"
      style={{marginTop: window.innerHeight*.067}}
    >
      <Grid
        width="100%"
        gap={4}
        templateColumns={['1fr', '250px 1fr']}
        gridTemplateAreas={["'sidebar' 'main'", "'sidebar main'"]}
      >
        <Box className="calendarArea" gridArea="main" backgroundColor="white">
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>

            <Box className="calendar" backgroundColor="#F8F8F8"  style={{width: "100%", height: '40px'}}>
              <Grid
                className="weekdays-grid"
                templateColumns="repeat(7, 1fr)"
                textAlign="right"
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
            </Box>
            <MobileDashboardContext.Provider value={{api, events, eventDatesArr, summaries}}>
              {items.length > 0 && <InfiniteCal items={items}/>}
            </MobileDashboardContext.Provider>
            
            {toggleNav === false && <ConfirmDatesBtn/>}
          </div>
        
          
          </Box>
      </Grid>
    </Box>
    </>
  );
};

export default Dashboard;


const Container = styled.div`
  width: 100%;
  display: flex; 
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #BDBDBD;
  padding: 5% 2.5% 2.5% 2.5%;
  position: fixed;
  top: 0;
  background: white; 
`;

const Cancel = styled.p`
  width: 40%;
  font-size: 20px;
  line-height: 27px;
  color: #28807D;
`;

const Title = styled.h1`
  width: 60%;
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  line-height: 27px;
`;


const BtnDiv = styled.div`
  width: 40%;
  height: 40%;
  display: flex;
  justify-content: flex-end;
`;
