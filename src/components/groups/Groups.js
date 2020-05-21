import React from 'react'
import styled from 'styled-components'; 
import btn from '../navigation/NavImgs/addgroupbtn.png'

const Groups = () => {
    return(
        <Container>
            <Cancel>Cancel</Cancel>
            <Title>Choose Group</Title>
            <BtnDiv>
                <Btn src={btn}></Btn>
            </BtnDiv>
        </Container>
    )
}

export default Groups;

const Container = styled.div`
    width: 100%;
    display: flex; 
    justify-content: center;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .1);
    padding: 3% 2.5% 2.5% 2.5%;
    position: fixed;
    top: 0;
    background: white; 
`;

const Cancel = styled.p`
    width: 40%;
    font-size: 20px;
    line-height: 27px;
    color: #28807D;

`;

const Title = styled.h1`
    width: 60%;
    text-align: center;
    font-weight: bold;
    font-size: 20px;
    line-height: 27px;
`;


const BtnDiv = styled.div`
    width: 40%;
    height: 40%;
    display: flex;
    justify-content: flex-end;

`;

const Btn = styled.img`
    cursor: pointer; 
`;
