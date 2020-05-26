import React, {useEffect, useState, useContext} from 'react';
import {Context} from '../../contexts/Contexts'
import styled from 'styled-components'
import { useAuth } from '../../contexts/auth';
import {convertTime, handleDelete, deleteTemplate} from '../../utils/helperFunctions'
import './ChooseDateForm.css'


const ChooseDateForm = ({starttime, endtime, title, id, templateList}) => {


  const {setFormOpen, setTemplateFormOpen, conStart, conEnd, setSelected, setToggleNav,setNavState, setConStart, setConEnd, setTitle, setTemplateList} = useContext(Context);

  const { googleApi} = useAuth();
  const { currentUser } = googleApi;


  const clearSelected = () => {
    setSelected([]);
  }


  //sets the title and time displayed on event page
  useEffect(()=>{
    setTitle(title);
    if (starttime){
      setConStart(convertTime(starttime))
    }
    if (endtime){
      setConEnd(convertTime(endtime))
    }
  },[starttime, endtime])
  

  //sets the title and starttime of the event actually being applied
  const handleCalendarView = () =>{
    setTitle(title);
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

  //sets state based on whether user has long-pressed an event (to delete)
  const [del, setDel] = useState(false)

  //controls classlist for the event object to control the red highlight transition
  const [eventClass, setEventClass] = useState('')

  //controls the hiding and showing of the actual delete button through toggling a class
  const [delClass, setDelClass] = useState('hide')

  //long-touch to delete an event
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

  //stops a tap/click on delete button from re-routing immediately to date selection, and deletes the event template
  const handleDeleteClick = e => {
    e.stopPropagation();
    console.log('whats the id?', id);
    handleDelete(id, currentUser, deleteTemplate, templateList, setTemplateList, clearSelected, setTemplateFormOpen);
    
  }

  const handleUpdate = e => {
    e.stopPropagation();
    setNavState(4);
  }


  return (
    <Container className={eventClass} onClick={handleCalendarView} onTouchStart={handleTouch} onContextMenu={(e)=> e.preventDefault()}>
      
      {/* <DeleteDiv className={delClass} onClick={(e)=>handleDelete(e)}>
       <Delete>X</Delete>

      </DeleteDiv> */}
      <EventDiv>
        <Title>
          {title}
        </Title>
        <Time fontSize="m" fontWeight="normal">
          {conStart}-{conEnd}
        </Time>
        
      </EventDiv>
      <UpdateBtn type="button" onClick={handleUpdate}>update</UpdateBtn>
      <DeleteBtn type="button" onClick={handleDeleteClick}>delete</DeleteBtn>
      
      {/* <ArrowDiv>
        >
      </ArrowDiv> */}

    </Container>
  );
};



export default ChooseDateForm;

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

// const Delete = styled.div`
//     width: 100%;
//     height: 100%;
//     color: white;
//     display: flex;
//     justify-content: center;
//     align-items: center;    
// `;

// const DeleteDiv = styled.div`
//     width: 10%;
// `;

const UpdateBtn = styled.div`
color: palevioletred;
background-color: white;
font-size: 1em;
margin: 1em;
padding: 0.25em 1em;
border: 2px solid palevioletred;
border-radius: 3px;
&:hover{
  cursor: pointer;
}
`;

const DeleteBtn = styled.div`
color: white;
background-color: palevioletred;
font-size: 1em;
margin: 1em;
padding: 0.25em 1em;
border: 2px solid palevioletred;
border-radius: 3px;
&:hover{
  cursor: pointer;
}
`;