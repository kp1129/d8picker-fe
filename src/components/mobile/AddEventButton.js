import React from 'react'
import styled from 'styled-components'

const AddEventButton = ({setNavState}) => {

    let bottom = 100 - Math.floor(window.innerHeight * .099) 


    const Btn = styled.div`
    background: #28807D;
    border-radius: 100%;
    width: 46px;
    height: 46px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 50px;
    position: absolute;
    bottom: ${bottom}%;
    
    left: 85%;
    cursor: pointer;
    &:hover{
        background: #1f605d;
    }
    
`;


    return <Btn onClick={()=>setNavState(3)}>+</Btn>
}

export default AddEventButton;

