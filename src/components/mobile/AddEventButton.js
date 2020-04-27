import React from 'react'
import styled from 'styled-components'

const AddEventButton = ({setNavState}) => {
    return <Btn onClick={()=>setNavState(1)}>+</Btn>
}

export default AddEventButton;

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
    top: 80%;
    left: 85%;
    cursor: pointer;
    &:hover{
        background: #1f605d;
    }
    
`;