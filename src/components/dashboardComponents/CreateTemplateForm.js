import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Flex,
  Box,
  Grid,
  Heading,
  Image,
  Button,
  Input
} from '@chakra-ui/core';
import axios from 'axios';
import { useAuth } from '../../contexts/auth';
import Calendar from './calendarComponents/Calendar.js';
import ChooseDateForm from './ChooseDateForm.js';


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

const addTemplate = async (data, { googleId }) => {
  const template = { ...data, googleId };
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_ENDPOINT_URL}/api/template`,
      template
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

const Dashboard = () => {
  const { googleApi, api } = useAuth();
  
  const [templateList, setTemplateList] = useState([]);
  const [templateFormOpen, setTemplateFormOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [selected, setSelected] = useState([]);

  const { register, handleSubmit } = useForm();
  // state used by template for selected days

  const { currentUser, handleSignOut } = googleApi;

  // Submit for template form
  const onSubmit = async formData => {
    const template = await addTemplate(formData, currentUser);
    setTemplateList(prevTemplates => [...prevTemplates, template]);
    setFormOpen(false);
  };

  useEffect(() => {
    (async () => {
      const templates = await getTemplateList(currentUser);
      setTemplateList(templates);
    })();
  }, [currentUser]);

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

              <div className="Form">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Input
                    type="text"
                    placeholder="title"
                    name="summary"
                    ref={register({ maxLength: 80, required: true })}
                  />
                  <Input
                    type="text"
                    placeholder="notes"
                    name="description"
                    ref={register({ maxLength: 100 })}
                  />
                  <Input
                    type="time"
                    name="starttime"
                    ref={register({ required: true })}
                  />
                  <Input
                    type="time"
                    name="endtime"
                    ref={register({ required: true })}
                  />

                  <Button type="submit">Submit</Button>
                </form>
              </div>

  );
};

export default Dashboard;
