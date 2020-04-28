import React, {useEffect, useState, useContext} from 'react';
import {MobileContext} from '../../../contexts/MobileContexts'
import styled from 'styled-components'
import {convertTime, handleDelete, deleteTemplate} from '../../../utils/helperFunctions'
import './MobileChooseDateForm.css'


const MobileChooseDateForm = ({starttime, endtime, summary, id, templateList}) => {


  const {setFormOpen, setTemplateFormOpen, conStart, conEnd, setSelected, setToggleNav,setNavState, setConStart, setConEnd, setSumm, setTemplateList} = useContext(MobileContext);

  


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

  const [del, setDel] = useState(false)
  const [eventClass, setEventClass] = useState('')
  const [delClass, setDelClass] = useState('hide')

  const handleTouch = e => {
    e.stopPropagation()
    setTimeout(()=>{setDel(!del)
      if(!del){
        setEventClass('deleting')
        setDelClass('show')
      } else {
        setEventClass('')
        setDelClass('hide')
      }

    },1000)
    
  }



  const handleMobileDelete = e => {
    e.stopPropagation();
    console.log('deleted')
    handleDelete(id, deleteTemplate, templateList, setTemplateList, clearSelected, setTemplateFormOpen)
  }


  return (
    <Container className={eventClass} onClick={handleCalendarView} onTouchStart={handleTouch} onContextMenu={(e)=> e.preventDefault()}>
      <DeleteDiv className={delClass} onClick={(e)=>handleMobileDelete(e)}>
       <Delete>X</Delete>

      </DeleteDiv>
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
    border-bottom: 1px solid #BDBDBD;
    padding: 2% 3%;


`;

const EventDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
    font-size: 20px;
    line-height: 27px;
    -moz-user-select: none;
   -khtml-user-select: none;
   -webkit-user-select: none;
   -ms-user-select: none;
   user-select: none;
`;

const Title = styled.p`
    width: 90%;
    font-weight: bold;
    font-size: 1rem;
    line-height: 27px;
`;

const Time = styled.p`
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

const Delete = styled.div`
    width: 100%;
    height: 100%;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;    
`;

const DeleteDiv = styled.div`
    width: 10%;
`;

