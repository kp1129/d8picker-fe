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
  const [isDisplayingGroup, setIsDisplayingGroup] = useState(false);
  const [currentGroup, setCurrentGroup] = useState({})

  //function to handle particular group data fetch
  const fetchGroupData = (groupId, adminId, token) => {
    let sortedGroupContacts = []
    let group = {}
    console.log(`/api/groups/${adminId}/${groupId}`)
    axiosWithAuth(token)
    .get(`/api/groups/${adminId}/${groupId}`)
    .then(async res => {
      sortedGroupContacts = [...res.data.contacts];
      await sortedGroupContacts.sort((a, b) => {
        let groupA = a.firstName.toUpperCase();
        let groupB = b.firstName.toUpperCase();
        if (groupA < groupB) {
          return -1;
        }
        if (groupA > groupB) {
          return 1;
        }
        return 0;
      });
      setCurrentGroup({...res.data, contacts: [...sortedGroupContacts]});
    })
    .catch(err => {
      console.log('Error', err);
    });
}

  //handles group toggle and calls function to fetch data according to condition
  const handleGroupDisplay = async (groupId, adminId, token) => {
    if(isDisplayingGroup === true && groupId !== currentGroup.id){
      await fetchGroupData(groupId, adminId, token)
      setIsDisplayingGroup(false)
      setIsDisplayingGroup(true)
      }else if(isDisplayingGroup === false){
      await fetchGroupData(groupId, adminId, token)
      setIsDisplayingGroup(true)
      }else{
      setIsDisplayingGroup(false)
    }
  } 

  // console.log('currentGroup: ', currentGroup)

  const handleChange = () => {
      setNavToggle(true)
  }

  const handleGroups = e => {
    setNavToggle(false)
    setNavState(2)
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
        <HeaderContainer>
          <Title>Choose Group</Title>
          <BackBtn
            onClick={() => {
              setNavState(0);
            }}
          >
            Back
          </BackBtn>
        </HeaderContainer>
        <TabsContainer>
          <Tabs className='groups' onClick={handleGroups}>Groups</Tabs>
          <Tabs className='contact' onClick={() => setNavState(7) && setNavToggle(!navToggle)}>Contacts</Tabs>
        </TabsContainer>
      </NavContainer>
      <GroupList>
        {groupList.map(group => {
          return (
            <Group key={group.id} onClick={()=>{handleGroupDisplay(group.id, adminInfo.adminId, token)}}>
              <GroupTitle color={group.groupColor}>
                <i
                  className={group.groupIcon}
                  style={{
                    fontSize: '1.6rem',
                    margin: '0 3% 0 0',
                    color: `${group.groupColor}`
                  }}
                ></i>
                {group.groupName}
              </GroupTitle>
              <Arrow className={group.id === currentGroup.id  && isDisplayingGroup === true ? 'fas fa-chevron-up' : 'fas fa-chevron-down'}/>
              {/* <GroupDescription>{group.groupDescription}</GroupDescription> */}
              {isDisplayingGroup === true && group.id === currentGroup.id && (
                <ContactList>
                  {currentGroup.contacts.map(contact => {
                    return(
                    <ContactDiv key={contact.id}>
                      <Name>{`${contact.firstName} ${contact.lastName}`}</Name>
                    </ContactDiv>
                    )
                  })}
                  <BtnContainer>
                    <EditBtn>Edit</EditBtn>
                    <DeleteBtn>Delete</DeleteBtn>
                  </BtnContainer>
                </ContactList>
              )}
            </Group>
          );
        })}
        <BtnDiv>
          <Btn
            src={btn}
            onClick={() => {
              setNavState(5);
            }}
          ></Btn>
        </BtnDiv>
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
  padding: 3% 2.5% 0 2.5%;
  position: fixed;
  top: 0;
  background: white;
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`

const BackBtn = styled.p`
  width: 48%;
  font-size: 1.2rem;
  text-align: right;
  line-height: 27px;
  color: #28807d;
`;

const Title = styled.h1`
  width: 48%;
  font-weight: bold;
  font-size: 20px;
  line-height: 27px;
`;

const BtnDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const Btn = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

const GroupList = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 22% 5% 30%;
`;
const Group = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 3% 0 1%;
`;

const GroupTitle = styled.h1`
  width: 80%;
  font-size: 1.6rem;
  color: ${props => props.color}
`
const BtnContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin: 4% 0 0 0;
`
const EditBtn = styled.button`
    width: 42%;
    background: #FFFFFF;
    font-size: 1.2em;
    line-height: 2em;
    color: #28807D;
    padding: 2% 10%;
    border: 2px solid #28807D;
    box-sizing: border-box;
    border-radius: 15px;
`
const DeleteBtn = styled.button`
    width: 42%;
    background: #28807D;
    font-size: 1.2em;
    line-height: 2em;
    color: #FFFFFF;
    padding: 1% 8%;
    border: 2px solid #28807D;
    box-sizing: border-box;
    border-radius: 15px;
`
const Arrow = styled.i`
  width: 10%;
  text-align: right;
  color: gray;
  font-size: 1.4rem;
`;

const GroupDescription = styled.h3`
  font-size: 1rem;
`;

const ContactList = styled.div`
  width: 100%;
`
const ContactDiv = styled.div`
  width: 100%;
  display: flex;
  margin: 1% 4%;
`

const Name = styled.h1`
  width: 100%;
  font-size: 1.4rem;
`
const TabsContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    font-size: 1rem;
`;
const Tabs = styled.button`
    border: 1px solid #AFC9D9;
    border-radius: 10px 10px 0 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 5px 10px;
`;