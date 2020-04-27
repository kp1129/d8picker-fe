import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {useAuth} from '../../contexts/auth'


const ConfirmDatesBtn = ({conStart, conEnd, summ, selected, setSelected, setTemplateFormOpen, setFormOpen}) => {

    const { api } = useAuth();

    //takes input from date selection and add template form and sends to google calendar api
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
        
        
        eventList.forEach(event => {
          api.addEvent(event)
        });
        setSelected([]);
        // setToggleNav(true)
        setFormOpen(false);
        setTemplateFormOpen(false)
        console.log('event added')
        //necessary so that event is sent to api before the page reloads. Page must reload to show new event list that contains the added events
        setTimeout(()=>{window.location.reload(false)}, 500);
      };

    const handleClick = (e) =>{
        e.preventDefault();
        // console.log('clicked confirm dates')
        applyTemplate(summ, "", conStart, conEnd);
    }

    const[shortSumm, setShortSumm] = useState(summ)

    //truncates the name of an event to fit on the button based on a percentage of the inner width of the window
    useEffect(()=>{
      if(summ.length > (window.innerWidth*.04)){
        setShortSumm(`${summ.substring(0,Math.floor((window.innerWidth*.04))-3)}...`)
      }
    
    },[summ])


    return(
        <ButtonContainer>
            <EventDiv>
                <Title>{shortSumm}</Title>
                <Time>{convertTime(conStart)}-{convertTime(conEnd)}</Time>
            </EventDiv>
            <Button onClick={handleClick}>Confirm Dates</Button>
        </ButtonContainer>
    )
}

export default ConfirmDatesBtn

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


  const ButtonContainer = styled.div`
  position: absolute;
  top: 90%;
  left: 20%;
  width: 60%;
  margin: 0 auto;
  height: 60px;
  border-radius: 30px;
  background: #d6d9db;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 100%;
  @media(max-width: 768px){
    width: 80%;
    left: 10%;
  }
`;

const EventDiv = styled.div`
    line-height: 22px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: 5%;
`;

const Title = styled.h1`
    font-size: 1.4rem;
    
    @media(max-width: 768px){
      font-size: 1rem;
    }
`;

const Time = styled.p`
    font-size: .9rem;
`;

const Button = styled.button`
    width: 141px;
    height: 42px;
    border-radius: 20px;
    background: #28807D;
    color: white;
    font-weight: bold;
    margin-right: 3%;
    cursor: pointer;
`;

