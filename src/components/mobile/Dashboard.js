import React, { useState, useEffect } from 'react';
import { Flex, Box, Grid } from '@chakra-ui/core';
import axios from 'axios';
import { useAuth } from '../../contexts/auth';
import Calendar from './Calendar';
import dayjs from 'dayjs';


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


const Dashboard = ({ setUserState }) => {
  const { googleApi, api } = useAuth();

  const [templateList, setTemplateList] = useState([]);
  const [templateFormOpen, setTemplateFormOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const [shadow, setShadow] = useState("");
  const { currentUser, handleSignOut } = googleApi;
  console.log(templateList)
  console.log('formOpen', formOpen);

  useEffect(() => {
    (async () => {
      const templates = await getTemplateList(currentUser);
      setTemplateList(templates);
    })();
  }, [currentUser, formOpen]);

  //highlights calendar based on whether choose dates button is active or not
  useEffect(() => {
    if (templateFormOpen) {
      setShadow("0px 0px 19px 7px rgba(99,179,237,1)")
    } else {
      setShadow("");
    }
  }, [templateFormOpen])

  // useEffect(()=>{
  //   window.addEventListener("scroll", ()=>{
  //     console.log(document.body.scrollTop)
  //   });

  //   return window.removeEventListener("scroll", ()=>{
  //     console.log('removed')
  //   })
  // },[])




  const [currentEl, setCurrentEl] = useState("");

  const [months, setMonths] = useState([dayjs().format('MMMM'), dayjs().add(1, 'month').format('MMMM'), dayjs().add(2, 'month').format('MMMM'),dayjs().add(3, 'month').format('MMMM'),dayjs().add(4, 'month').format('MMMM')])


  // state to show users events
  const [events, setEvents] = useState(null);

  // get events from api and set to state
  useEffect(() => {
    (async () => {
      try {
        const data = await api.listEvents();
        setEvents(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [api]);




  return (
    <Box
      pos="relative"
      backgroundColor="brand.lightgray"
      p={[4, 16]}
      minHeight="100vh"
    >
      <Grid
        width="100%"
        gap={4}
        templateColumns={['1fr', '250px 1fr']}
        gridTemplateAreas={["'sidebar' 'main'", "'sidebar main'"]}
      >
        <Box className="calendarArea" gridArea="main" style={{ boxShadow: shadow }}>
          {months.map(thisMonth=>{
            return <Calendar 
            api={api}
            selected={selected}
            setSelected={setSelected}
            templateFormOpen={templateFormOpen}
            setTemplateFormOpen={setTemplateFormOpen}
            events={events}
            month={thisMonth}
          />
          })}
          
        </Box>
      </Grid>
    </Box>
  );
};

export default Dashboard;

