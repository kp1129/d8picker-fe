import React, {useEffect} from 'react';
import {
  Flex,
  Heading,
  IconButton
} from '@chakra-ui/core';
import { useAuth } from '../../../contexts/auth';
import axios from 'axios'
import styled from 'styled-components'


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
    <Container onClick={handleCalendarView}>
      <EventDiv>
        <Title>
          {summary}
        </Title>
        <Time fontSize="m" fontWeight="normal">
          {conStart}-{conEnd}
        </Time>
      </EventDiv>
      <ArrowDiv>
        >
      </ArrowDiv>

    </Container>
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

const Container = styled.div`
    width: 100%;
    display: flex;
    // flex-direction: column;
    border-bottom: 1px solid #BDBDBD;
    padding: 2% 3%;
    background: white; 
    &:hover{
      background: #BDBDBD;
    }

`;

const EventDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
    font-size: 20px;
    line-height: 27px;
`;

const Title = styled.p`
    width: 90%;
    // text-align: center;
    font-weight: bold;
    font-size: 1rem;
    line-height: 27px;
`;

const Time = styled.p`
    // width: 60%;
    // text-align: center;
    font-weight: bold;
    font-size: .75rem;
    line-height: 27px;
`;



const ArrowDiv = styled.div`
    width: 10%;
    display: flex;
    align-items: center;
    font-size: 210%;
    color: #BDBDBD;
    cursor: pointer;
    &:hover{
      color: white;
    }

`;

const Btn = styled.div`
    background: white;
    border-radius: 100%;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #28807D;
    border: 3px solid #28807D;
    font-size: 40px;
    cursor: pointer;
    
`;

