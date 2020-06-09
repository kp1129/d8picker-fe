import React, {useContext, useEffect} from 'react';
import styled from 'styled-components'; 
import btn from '../navigation/NavImgs/addgroupbtn.png';
import { useToasts } from 'react-toast-notifications'

const Groups = ({setNavState, groupList}) => {
    return(
        <Container>
            <NavContainer>
                <Cancel onClick={()=>{setNavState(0)}}>Cancel</Cancel>
                <Title>Choose Group</Title>
                <BtnDiv>
                    <Btn src={btn} onClick={()=>{setNavState(5)}}></Btn>
                </BtnDiv>
            </NavContainer>
            <GroupList>
            {groupList.map(group => {
                return(
                <Group key={group.id}>
                    <GroupTitle>{group.groupName}</GroupTitle>
                    <GroupDescription>{group.groupDescription}</GroupDescription>
                </Group>

                )
            })}
            </GroupList>
        </Container>
    )
}

export default Groups;

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
`

const NavContainer = styled.div`
    width: 100%;
    display: flex; 
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .1);
    padding: 3% 2.5% 2.5% 2.5%;
    position: fixed;
    top: 0;
    background: white; 
`;

const Cancel = styled.p`
    width: 30%;
    font-size: 20px;
    line-height: 27px;
    color: #28807D;

`;

const Title = styled.h1`
    width: 30%;
    text-align: center;
    font-weight: bold;
    font-size: 20px;
    line-height: 27px;
`;


const BtnDiv = styled.div`
    width: 30%;
    height: 40%;
    display: flex;
    justify-content: flex-end;

`;

const Btn = styled.img`
    cursor: pointer; 
`;

const GroupList = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 22% 0 30%;
    border: solid 2px red;
`
const Group = styled.div`
    width: 92%;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin: 2% 0;
`

const GroupTitle = styled.h1`
    font-size: 1.6rem;
`

const GroupDescription = styled.h3`
    font-size: 1rem;
`
