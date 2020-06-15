import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../contexts/Contexts';
import styled from 'styled-components';
import btn from '../navigation/NavImgs/addgroupbtn.png';
import { useAuth } from '../../contexts/auth';
import { useToasts } from 'react-toast-notifications';
import axiosWithAuth from '../../utils/axiosWithAuth';
import Contacts from '../contacts/Contacts.js';
import CreateNewGroup from './CreateNewGroup';

const Groups = ({ setNavState }) => {
  const { googleApi } = useAuth();
  const { currentUser } = googleApi;
  const { token } = currentUser;
  const { adminInfo, groupList, setGroupList, width } = useContext(Context)

  const [navToggle, setNavToggle] = useState(false);
  const [isDisplayingGroup, setIsDisplayingGroup] = useState(false);
  const [currentGroup, setCurrentGroup] = useState({});
  const [deleteGroup, setDeleteGroup] = useState([]);

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
    // deletes group
    const handleDelete = (groupId, adminId, token) => {
        console.log(`/api/groups/${adminId}/${groupId}`)
        axiosWithAuth(token, googleApi)
            .delete(`/api/groups/${adminId}/${groupId}`)
            .then(res => {
                setGroupList(groupList.filter(g => g.id !== groupId));
            //     setDeleteGroup({
            //         ...deleteGroup,
            // })
          })
        .catch(error => console.log(error.response))
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

    {width < 768 &&  (<NavContainer>
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
      </NavContainer>)}
      <GroupList>
        {groupList.map(group => {
          return (
            <Group key={group.id} onClick={()=>{handleGroupDisplay(group.id, adminInfo.adminId, token)}}>
              <GroupTitle color={group.groupColor}>
                <i
                  className={group.groupIcon}
                  style={{
                    margin: '0 3% 0 0',
                    color: `${group.groupColor}`
                  }}
                ></i>
                {group.groupName}
              </GroupTitle>
              <Arrow className={group.id === currentGroup.id  && isDisplayingGroup === true ? 'fas fa-chevron-up' : 'fas fa-chevron-down'}/>
              {isDisplayingGroup === true && group.id === currentGroup.id && (
                <ContactList>
                  {currentGroup.contacts.map(contact => {
                    return(
                    <ContactDiv key={contact.id}>
                      <ContactIcon className="fas fa-user-alt"></ContactIcon>
                      <ContactInfoContainer>
                        <Name>{`${contact.firstName} ${contact.lastName}`}</Name>
                        <IconContainer>
                          <Icon className="fas fa-phone"></Icon>
                          <Icon className="fas fa-comment-medical"></Icon>
                          <Icon className="fas fa-envelope"></Icon>
                        </IconContainer>
                      </ContactInfoContainer>
                    </ContactDiv>
                    )
                  })}
                  <BtnContainer>
                    <EditBtn>Edit</EditBtn>
                    <DeleteBtn onClick={() => handleDelete(group.id, adminInfo.adminId, token)}>Delete</DeleteBtn>
                  </BtnContainer>
                </ContactList>
              )}
            </Group>
          );
        })}
        <BtnDiv>
          {width < 768 && <Btn
            src={btn}
            onClick={() => {
              setNavState(5);
            }}></Btn>}
          
        </BtnDiv>
      </GroupList>
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
  margin: 2% 0 0;
`;

const Btn = styled.img`
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

const GroupList = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin: 22% 5% 30%;
  @media ${device.desktop} {
    width: 90%;
    margin: 0 auto;
    }

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
  color: ${props => props.color};
  @media ${device.desktop} {
    font-size: 1.25rem;
    }
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

const ContactList = styled.div`
  width: 100%;
`
const ContactDiv = styled.div`
  width: 100%;
  margin: 5% 0;
  display: flex;
  justfiy-content: space-between;
`
const ContactIcon = styled.i`
  width: 20%;
  margin: 2% 0 0 0;
  font-size: 3rem;
  color: #28807D;
`
const ContactInfoContainer = styled.div`
  width: 70%
  display: flex;
  flex-wrap: wrap;
`
const Name = styled.h1`
  width: 100%;
  font-size: 1.4rem;
`
const IconContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`
const Icon = styled.i`
  width: 20%;
  font-size: 1.4rem;
  color: #AFC9D9;
`
const TabsContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
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
