import React, {useState, useEffect, useContext} from 'react';
import { useAuth } from '../../contexts/auth';
import { DashboardContext, Context } from '../../contexts/Contexts'
import styled from 'styled-components';
import axiosWithAuth from '../../utils/axiosWithAuth';



// Displays blue box with name of event
const EventIndicator = ({ event, eventDate, eventTitle}) => {
  const [title, setTitle] = useState("")
  const {setEvent, setEventDisplay} = useContext(DashboardContext);
  const { templateList } = useContext(Context);
  const { googleApi } = useAuth();
  const templateId = [...templateList.filter(t => t.title == eventTitle)][0].id;
  const [template, setTemplate] = useState({groups: []});

  useEffect(() => {
    axiosWithAuth(googleApi.currentUser.token)
      .get(`/api/template/templateInfo/${templateId}`)
      .then(res => {
        setTemplate(res.data);
      })
      .catch(err => console.log(err))
  }, [])

  //if name of event is greater than 5 characters, shorten it to fit within a day box at mobile size
  useEffect(()=>{
      eventTitle.length > 5 ? setTitle(eventTitle.substring(0,5)) : setTitle(eventTitle)
  },[eventTitle])

  const loadEventComponent = e => {
    e.preventDefault();
    setEventDisplay(true);
    event.title = event.summary;
    event.notes = event.description;
    event.date = event.start.dateTime.substring(0,10);
    event.starttime = event.start.dateTime.substring(11,19);
    event.endtime = event.end.dateTime.substring(11,19);
    // event.group = template.groups[0] ? template.groups[0] : {id: 1, groupName: 'new test', groupColor: '#c70c00', groupIcon: 'fas fa-star'}
    setEvent(event);
  }
  
  return eventDate ? (
    <EventContainer>
      <Event>
        <button onClick={loadEventComponent} style = {{background: template.groups[0] ? template.groups[0].groupColor : '#1E85C4'}}>
          {template && <span><i class={template.groups[0] ? template.groups[0].groupIcon : ''} /></span>}
          {title}
        </button> 
      </Event>
    </EventContainer>
  ) : null;
};

export default EventIndicator;

const EventContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  // width: 100%;
  margin: 2% 0
`;


const Event = styled.div`
  font-size: 90%;
  background: #1E85C4;
  color: white;
  border-radius: 5px;
`;




