import React, { useState, useEffect } from 'react';
import {Flex, Box, Grid} from '@chakra-ui/core';
import axios from 'axios';
import { useAuth } from '../../contexts/auth';
import Calendar from './calendarComponents/Calendar.js';
import ProfileInfo from './ProfileInfo'
import TemplateContainer from './TemplateContainer'


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

const deleteTemplate = async id => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_ENDPOINT_URL}/api/template/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const Dashboard = ({setUserState}) => {
  const { googleApi, api } = useAuth();
  
  const [templateList, setTemplateList] = useState([]);
  const [templateFormOpen, setTemplateFormOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const { currentUser, handleSignOut } = googleApi;

  console.log('formOpen', formOpen);

  useEffect(() => {
    (async () => {
      const templates = await getTemplateList(currentUser);
        setTemplateList(templates);
    })();
  }, [currentUser, formOpen]);

  const handleDelete = async id => {
    await deleteTemplate(id);
    const templates = templateList.filter(template => template._id !== id);
    setTemplateList(templates);
  };

  const applyTemplate = (summary, description, starttime, endtime) => {
    //creates new date and isolates timezone offset
    let date = new Date().toString().split("GMT");
    //takes the first few characters of offset with + or - to be slotted in the start and end times
    let zone = date[1].split(' ')[0].slice(0, 3);
    const eventList = selected.map(e => ({
      end: { dateTime: `${e}T${endtime}:00${zone}:00` },
      start: { dateTime: `${e}T${starttime}:00${zone}:00` },
      summary: summary,
      description: description
    }));
    console.log('eventList', eventList);
    eventList.forEach(event => api.addEvent(event));
    setSelected([]);
  };


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
        <Flex
          className="sidebar"
          gridArea="sidebar"
          direction="column"
          align="center"
        >
          <ProfileInfo currentUser={currentUser} handleSignOut={handleSignOut} setUserState={setUserState}/>
          <TemplateContainer
            setSelected={setSelected}
            selected={selected}
            templateFormOpen={templateFormOpen}
            setTemplateFormOpen={setTemplateFormOpen}
            applyTemplate={applyTemplate}
            handleDelete={handleDelete}

            formOpen={formOpen}
            setFormOpen={setFormOpen}
            setTemplateList={setTemplateList}
            currentUser={currentUser}
            templateList={templateList}
          />
        </Flex>
        <Box className="calendarArea" gridArea="main">
          <Calendar
            api={api}
            selected={selected}
            setSelected={setSelected}
            templateFormOpen={templateFormOpen}
            setTemplateFormOpen={setTemplateFormOpen}
          />
        </Box>
      </Grid>
    </Box>
  );
};

export default Dashboard;
