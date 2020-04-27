import React, {useEffect, useContext} from 'react';
import {MobileContext} from '../../../contexts/MobileContexts'
import styled from 'styled-components'
import {convertTime} from '../../../utils/helperFunctions'


const MobileChooseDateForm = ({starttime, endtime, summary}) => {


  const {setFormOpen, setTemplateFormOpen, conStart, conEnd, setSelected, setToggleNav,setNavState, setConStart, setConEnd, setSumm} = useContext(MobileContext);

  


  const clearSelected = () => {
    setSelected([]);
  }


  //sets the summary and time displayed on event page
  useEffect(()=>{
    setSumm(summary);
    if (starttime){
      setConStart(convertTime(starttime))
    }
    if (endtime){
      setConEnd(convertTime(endtime))
    }
  },[starttime, endtime])
  

  //sets the summary and starttime of the event actually being applied
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

