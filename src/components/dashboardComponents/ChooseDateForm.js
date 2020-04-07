import React, {useState} from 'react';
import {
  Flex,
  ButtonGroup,
  Button,
  Heading,
  IconButton
} from '@chakra-ui/core';
import { useAuth } from '../../contexts/auth';
import axios from 'axios'


//TODO LINK UP THE DAYS.JS TRIGGER TO MATCH THE TEMPLATE TOGGLE FROM A STATE WIDE SELECTION.


const ChooseDateForm = ({
  id,
  starttime,
  endtime,
  summary,
  description,
  selected,
  setSelected,
  templateFormOpen,
  setTemplateFormOpen,
  setTemplateList,
  templateList
}) => {

  const { googleApi, api } = useAuth();
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

  const [toggledTemplate, setToggledTemplate] = useState(false);

  const openTemplate = () => {
    setTemplateFormOpen(!templateFormOpen);
    setToggledTemplate(!toggledTemplate);
    setSelected([]);
    console.log(templateFormOpen);
  };


  const clearSelected = () => {
    setSelected([]);
  }

  return (
    <Flex direction="column" align="center" justify="center" my={2}>
      <Heading fontSize="sm" fontWeight="normal">
        {summary}
      </Heading>
      <Heading fontSize="sm" fontWeight="normal">
        {starttime}-{endtime}
      </Heading>
      <Flex>
        <ButtonGroup spacing={4}>
          <Button size="sm" variantColor="blue" onClick={() => {
            openTemplate()
          }}>
            Choose Dates
          </Button>
          <IconButton
            variantColor="red"
            aria-label="Delete"
            size="sm"
            icon="close"
            onClick={() => handleDelete(id)}
          />
        </ButtonGroup>
      </Flex>

      {templateFormOpen && toggledTemplate && (
        <div>

        <button
          onClick={() =>
            applyTemplate(summary, description, starttime, endtime, selected)
          }
        >
          Apply Template
        </button>
        <Button onClick={clearSelected}>Clear Selection</Button>
        </div>
      )}
    </Flex>
  );
};

export default ChooseDateForm;
