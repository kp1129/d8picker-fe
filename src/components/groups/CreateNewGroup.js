import React, { useState, useContext } from 'react';
import { useAuth } from '../../contexts/auth';
import { DashboardContext } from '../../contexts/Contexts'
import styled from 'styled-components';
// import { useToasts } from 'react-toast-notifications';

const CreateNewGroup = ({setNavState}) => {

    return (
        <Container>
             <Cancel onClick={() => {setNavState(2)}}>Cancel</Cancel>
        </Container>
    )
}

export default CreateNewGroup

const Container = styled.div`
    width: 100%;
    display: flex;
`

const Cancel = styled.p`
    width: 40%;
    padding: 2% 0 0 2%;
    font-size: 20px;
    line-height: 27px;
    color: #28807D;

`;