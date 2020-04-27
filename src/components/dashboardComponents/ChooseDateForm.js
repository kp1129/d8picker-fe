import React, {useState, useEffect} from 'react';
import {
  Flex,
  ButtonGroup,
  Button,
  Heading,
  IconButton
} from '@chakra-ui/core';
import { useAuth } from '../../contexts/auth';
import {convertTime, convertEvents, deleteTemplate, handleDelete} from '../../utils/helperFunctions'



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

  const { api } = useAuth();



  const applyTemplate = (summary, description, starttime, endtime) => {
    //creates new date and isolates timezone offset
    let date = new Date().toString().split("GMT");
    //takes the first few characters of offset with + or - to be slotted in the start and end times
    let zone = date[1].split(' ')[0].slice(0, 3);
    const eventList = convertEvents(selected, starttime, endtime, zone, summary, description);
    
    eventList.forEach(event => {
     
      api.addEvent(event)
    });
    setSelected([]);
    reloadPage()
  };

  const [toggledTemplate, setToggledTemplate] = useState(false);

  const openTemplate = () => {
    setTemplateFormOpen(!templateFormOpen);
    setToggledTemplate(!toggledTemplate);
    setSelected([]);
    
  };


  const clearSelected = () => {
    setSelected([]);
  }

  //triggers the refresh for the page on submiting calendar information
  const reloadPage=() =>{
    const reload=() =>{
      window.location.reload(false)
    }
    reload()
  }


  const [conStart, setConStart] = useState("");
  const [conEnd, setConEnd] = useState("");

  useEffect(()=>{
    if (starttime){
      setConStart(convertTime(starttime))
    }
    if (endtime){
      setConEnd(convertTime(endtime))
    }
  },[starttime, endtime])
  




  return (
    <Flex direction="column" align="center" justify="center" my={2}>
      <Heading fontSize="sm" fontWeight="normal">
        {summary}
      </Heading>
      <Heading fontSize="sm" fontWeight="normal">
        {conStart}-{conEnd}
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
            onClick={() => handleDelete(id, deleteTemplate, templateList, setTemplateList, clearSelected, setTemplateFormOpen)}
          />
        </ButtonGroup>
      </Flex>

      {templateFormOpen && toggledTemplate && (
        <div>

        <button style={{margin: 2}}
          onClick={() =>
            applyTemplate(summary, description, starttime, endtime, selected)
          }
        >
          Save Events
        </button>
        <Button onClick={clearSelected}>Clear Selection</Button>
        </div>
      )}
    </Flex>
  );
};



export default ChooseDateForm;
