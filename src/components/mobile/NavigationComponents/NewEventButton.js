import React from 'react';
import CirclePlus from './circle-plus.png'
import styled from 'styled-components'

const NewEventButton = (props) => {

  const handleNewEvent = () =>{
    props.setNavState(3)
}

const FixedButton = styled.div`
position: fixed;
top: 85vh;
right: 5vw;
`

  return (
    <FixedButton >
      <img src={CirclePlus} onClick={handleNewEvent} alt="New Event Button"></img>
    </FixedButton>
  )
}

export default NewEventButton;