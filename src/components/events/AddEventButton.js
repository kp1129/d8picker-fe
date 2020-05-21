import React, {useContext} from 'react'
import styled from 'styled-components'
import btn from '../navigation/NavImgs/addeventbtn.png'
import {Context} from '../../contexts/Contexts'

//redirects user to new event form
const AddEventButton = () => {
    const {setNavState} = useContext(Context);
    return <Img src={btn} onClick={()=>setNavState(3)}/>
}

export default AddEventButton;



    const Img = styled.img`
    position: fixed;
    bottom: 20%;
    left: 80%; 
    cursor: pointer;    
    `;

