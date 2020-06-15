import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../contexts/Contexts';
import styled from 'styled-components';
import btn from '../navigation/NavImgs/addgroupbtn.png';
import { useAuth } from '../../contexts/auth';
import { useToasts } from 'react-toast-notifications';
import axiosWithAuth from '../../utils/axiosWithAuth';
import Contacts from '../contacts/Contacts.js';
import CreateNewGroup from './CreateNewGroup';

const Groups = () => {
  const { googleApi } = useAuth();
  const { currentUser } = googleApi;
  const { token } = currentUser;
  const { adminInfo, width, groupList, setGroupList, setNavState } = useContext(
    Context
  );

  const [navToggle, setNavToggle] = useState(false);
  const [addGroup, setAddGroup] = useState(false);
  const [activeGroup, setActiveGroup] = useState(null);

  const handleChange = () => {
    setNavToggle(true);
  };

  const handleGroups = e => {
    setNavToggle(false);
    setNavState(5);
  };

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

  // controls Add Group button behavior
  const handleDesktopAddGroup = e => {
    e.stopPropagation();
    setAddGroup(true);
  };

  const handleClickedGroup = (e, id) => {
    e.stopPropagation();
    setActiveGroup(id);
  }
  return (
    <Container>
      {width <= 768 && (
        <NavContainer>
          <Cancel onClick={() => setNavState(0)}>Cancel</Cancel>
          <Title>Choose Group</Title>
          <TabsContainer>
            <Tabs className="groups" onClick={handleGroups}>
              Groups
            </Tabs>
            <Tabs
              className="contact"
              onClick={() => setNavState(7) && setNavToggle(!navToggle)}
            >
              Contacts
            </Tabs>
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
      )}
      <GroupList>
        {groupList.map(group => {
          return (
            <Group onClick={(e) => handleClickedGroup(e, group.id)} key={group.id}>
              <GroupTitle style={{ color: `${group.groupColor}` }}>
                <i
                  className={group.groupIcon}
                  style={{
                    margin: '0 3% 0 0',
                    color: `${group.groupColor}`
                  }}
                ></i>
                {group.groupName}

              {width >= 768 && ( <Arrow className={activeGroup === group.id ?
                'fas fa-chevron-up' :                
                'fas fa-chevron-down'}></Arrow>)}
              </GroupTitle>

              {width <= 768 && (
                <GroupDescription>{group.groupDescription}</GroupDescription>
              )}
              {width >= 768 && activeGroup === group.id && (
                <GroupContactsContainer>contact</GroupContactsContainer>
              )}
            </Group>
          );
        })}
      </GroupList>
      {width >= 768 && (
        <AddGroupBtn onClick={e => handleDesktopAddGroup(e)}>
          Add group{' '}
        </AddGroupBtn>
      )}
      {/* {addGroup && <CreateNewGroup setAddGroup={setAddGroup} />} */}
      {/* <div onClick={handleChange}>{navToggle && <Contacts />}</div> */}
    </Container>
  );
};

export default Groups;

// styled components
const size = {
  tablet: '768px',
  desktop: '1024px'
};
const device = {
  desktop: `(min-width: ${size.desktop})`
};

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
  @media ${device.desktop} {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0.5rem 0;
  }
`;
const Group = styled.div`
  width: 92%;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 3% 0;
`;

const AddGroupBtn = styled.div`
  margin: 0 auto;
  cursor: pointer;
  width: 90%;
  color: #28807d;
  font-weight: bold;
  border: 2px solid #28807d;
  border-radius: 0.5rem;
  text-align: center;
  padding: 0.25rem 1rem;
`;

const GroupTitle = styled.h1`
  font-size: 1.6rem;
  @media ${device.desktop} {
    display: flex;
    flex-wrap: wrap;
    font-size: 1.15rem;
    justify-content: space-between;
  }
`;

const Arrow = styled.i`
  display: none;

  @media ${device.desktop} {
    display: inline-block !important;
    color: gray;
    font-size: 1.4rem;
    // margin-left: 30%;
  }
`;

const GroupDescription = styled.h3`
  font-size: 1rem;
`;

const GroupContactsContainer = styled.div`
  background: gray;
  color: white;
`;

const TabsContainer = styled.div`
  width: 92%;
  display: flex;
  justify-items: flex-end;
  margin-left: 70%;
  font-size: 1rem;
`;
const Tabs = styled.button`
  border: 1px solid #afc9d9;
  border-radius: 10px 10px 0 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 5px 10px;
`;
