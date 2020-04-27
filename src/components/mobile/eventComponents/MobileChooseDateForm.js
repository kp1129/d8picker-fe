import React, {useEffect} from 'react';
import {
  Flex,
  Heading,
  IconButton
} from '@chakra-ui/core';
import { useAuth } from '../../../contexts/auth';
import axios from 'axios'


const MobileChooseDateForm = ({
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
  templateList,
  setNavState,
  formOpen,
  setFormOpen,
  setToggleNav, 
  toggleNav,
  conStart, 
  setConStart, 
  conEnd, 
  setConEnd, 
  summ, 
  setSumm
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
    clearSelected();
    setTemplateFormOpen(false);
  };



  const clearSelected = () => {
    setSelected([]);
  }



  useEffect(()=>{
    setSumm(summary);
    if (starttime){
      setConStart(convertTime(starttime))
    }
    if (endtime){
      setConEnd(convertTime(endtime))
    }
  },[starttime, endtime])
  


  const handleCalendarView = () =>{
    setSumm(summary);
    if (starttime){
      setConStart(starttime)
    }
    if (endtime){
      setConEnd(endtime)
    }
    setNavState(0)
    setTemplateFormOpen(true)
    setFormOpen(true)
    setToggleNav(false)
  }


  return (
    <Flex direction="column" align="center" justify="center" my={2} onClick={handleCalendarView}>
      <Heading fontSize="m" fontWeight="normal">
        {summary}
      </Heading>
      <Heading fontSize="m" fontWeight="normal">
        {conStart}-{conEnd}
      </Heading>

    </Flex>
  );
};




    const convertTime = (time)=>{
      // code converts response.data.starttime to number

      
      if (time){

          let splitStartTime = time.split(':');
          let joinStartTime = splitStartTime.join('');
          let startTimeAsNumber = parseInt(joinStartTime, 10);
      
          // fn for converting response.data.starttime and/or endtime back to time string (from number)
          function convertToTime(value, index) {
            return value.substring(0, index) + ":" + value.substring(index);
          }
      
          // converts times from 24 hour to 12 hour format
          if (startTimeAsNumber >= 1300) {
            startTimeAsNumber -= 1200;
            let startTimeAsString = startTimeAsNumber.toString();
            let convertedStartTime = convertToTime(startTimeAsString, startTimeAsString.length - 2);
            return convertedStartTime + 'pm';
          } else {
            return time + 'am';
          }
      }
    }


export default MobileChooseDateForm;
