import React from 'react'
import styled from 'styled-components'
import btn from './NavigationComponents/NavImgs/addeventbtn.png'

const AddEventButton = ({setNavState}) => {
    return <Img src={btn} onClick={()=>setNavState(3)}/>
}

export default AddEventButton;



    const Img = styled.img`
    position: fixed;
    bottom: 20%;
    left: 80%; 
    cursor: pointer;    
    `;

