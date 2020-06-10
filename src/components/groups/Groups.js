import React, { useContext, useEffect, useState } from 'react';
import {Context} from '../../contexts/Contexts';
import styled from 'styled-components';
import btn from '../navigation/NavImgs/addgroupbtn.png';
import { useAuth } from '../../contexts/auth';
import { useToasts } from 'react-toast-notifications'
import axiosWithAuth from '../../utils/axiosWithAuth';
import Contacts from '../contacts/Contacts.js';

const Groups = ({ setNavState, groupList, setGroupList }) => {
  const { googleApi } = useAuth();
  const { currentUser } = googleApi;
  const { token } = currentUser;
  const { adminInfo } = useContext(Context)

  const [navToggle, setNavToggle] = useState(false);

  const handleChange = () => {
      setNavToggle(true);
  }

  const handleGroups = e => {
    setNavToggle(false)
    setNavState(5)
}

  
  //sets groupList state to state and sorts aplphabetically
  const getGroupList = () => {
    let sortedGroupList = [];
    axiosWithAuth(token)
      .get(`/api/groups/${adminInfo.adminId}`)
      .then(res => {
        console.log(res.data);
        sortedGroupList = [...res.data.groups];
        sortedGroupList.sort((a, b) => {
          let nameA = a.groupName.toUpperCase();
          let nameB = b.groupName.toUpperCase();

          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
        setGroupList([...sortedGroupList]);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getGroupList();
  }, []);

  return (
    <Container>
      <NavContainer>
        <Cancel
          onClick={() => {
            setNavState(0);
          }}
        >
          Cancel
        </Cancel>
        <Title>Choose Group</Title>
            <TabsContainer>
                    <Tabs className='groups' onClick={handleGroups}>Groups</Tabs>
                    <Tabs className='contact' onClick={() => setNavState(7) && setNavToggle(!navToggle)}>Contacts</Tabs>
                </TabsContainer>
        <BtnDiv>
          <Btn
            src={btn}
            onClick={() => {
              setNavState(5);
            }}
          ></Btn>
        </BtnDiv>
      </NavContainer>
      <GroupList>
        {groupList.map(group => {
          return (
            <Group key={group.id}>
              <h1 style={{ fontSize: '1.6rem', color: `${group.groupColor}` }}>
                <i
                  className={group.groupIcon}
                  style={{
                    fontSize: '1.6rem',
                    margin: '0 3% 0 0',
                    color: `${group.groupColor}`
                  }}
                ></i>
                {group.groupName}
              </h1>
              <GroupDescription>{group.groupDescription}</GroupDescription>
            </Group>
          );
        })}
      </GroupList>
      <div onClick={handleChange}> 
      {navToggle && <Contacts />}
      </div>
    </Container>
  );
};

export default Groups;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const NavContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 3% 2.5% 2.5% 2.5%;
  position: fixed;
  top: 0;
  background: white;
`;

const Cancel = styled.p`
  width: 30%;
  font-size: 20px;
  line-height: 27px;
  color: #28807d;
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
`;
const Group = styled.div`
  width: 92%;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 2% 0;
`;

// const GroupTitle = styled.h1`
//     font-size: 1.6rem;
// `

const GroupDescription = styled.h3`
  font-size: 1rem;
`;

const TabsContainer = styled.div`
    display: flex;
    padding-top: 6%;
`;

const Tabs = styled.p`
    display: flex;
    align-items: center;
    justify-content: space-between;

`;
