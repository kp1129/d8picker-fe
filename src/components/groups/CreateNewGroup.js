import React, { useState, useContext } from 'react';
import { Context } from '../../contexts/Contexts';
import { useAuth } from '../../contexts/auth';
import styled from 'styled-components';
import axiosWithAuth from '../../utils/axiosWithAuth';
// import { useToasts } from 'react-toast-notifications';

const CreateNewGroup = ({ setNavState, setGroupList }) => {
  //needed variables for first axios call, current user object and token from currentUser object
  const { googleApi } = useAuth();
  const { currentUser } = googleApi;
  const { adminInfo } = useContext(Context);
  const { token } = currentUser;
  // const { adminInfo } = useContext(Context)

  const colorOptions = [
    '#c70c00',
    '#ff2bae',
    '#ffcc77',
    '#9d6e1f',
    '#561302',
    '#8a0a01',
    '#2e5780',
    '#f65b1c',
    '#2f95f9',
    '#81c1ff',
    '#f19805',
    '#218047'
  ];
  const iconOptions = ['fas fa-star', 'fas fa-square', 'fas fa-circle'];

  const [selectedColor, setSelectedColor] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('');

  const [newGroup, setNewGroup] = useState({
    groupName: '',
    groupDescription: '',
    groupColor: '',
    groupIcon: '',
    adminId: adminInfo.adminId
  });

  const [message, setMessage] = useState('');

  const handleChange = e => {
    setNewGroup({
      ...newGroup,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('ADMIN ID: ', adminInfo.adminId);
    if (!newGroup.groupName) {
      setMessage('Please provide a name for your group');
    }
    console.log('newGroup: ', newGroup);
    axiosWithAuth(token)
      .post(`/api/groups/${adminInfo.adminId}`, newGroup)
      .then(async res => {
        await setGroupList([...res.data.groups]);
        setNavState(2);
      })
      .catch(err => {
        console.log('ERROR 2: ', err);
      });
  };

  return (
    <Container>
      <HeaderContainer>
        <CancelBtn
          onClick={() => {
            setNavState(2);
          }}
        >
          Cancel
        </CancelBtn>
        <Header>New Group</Header>
      </HeaderContainer>
      <Form>
        <Label htmlFor="groupName">
          {' '}
          Group Name:
          <Input
            type="text"
            placeholder="New Group Name"
            name="groupName"
            value={newGroup.groupName}
            onChange={handleChange}
          />
        </Label>

        <br />

        <Label htmlFor="groupName">
          {' '}
          Group Description:
          <Input
            type="text"
            placeholder="New Group Description"
            name="groupDescription"
            value={newGroup.groupDescription}
            onChange={handleChange}
          />
        </Label>
        <ColorsContainer>
          {colorOptions.map(color => {
            if (selectedColor === color) {
              return (
                <ColorOption
                  key={color}
                  onClick={() => {
                    setSelectedColor(color)
                    setNewGroup({
                      ...newGroup,
                      groupColor: color
                    })
                  }}
                  color={`${color}`}
                  border={`solid 3px black`}
                  borderRadius={`5px`}
                />
              );
            } else {
              return (
                <ColorOption
                  key={color}
                  onClick={() => {
                    setSelectedColor(color)
                    setNewGroup({
                      ...newGroup,
                      groupColor: color
                    })
                  }}
                  color={`${color}`}
                />
              );
            }
          })}
        </ColorsContainer>
        <IconsContainer>
          {iconOptions.map(icon => {
            if (selectedIcon === icon) {
              return (
                <Icon
                  key={icon}
                  onClick={() => {
                    setSelectedIcon(icon)
                    setNewGroup({
                      ...newGroup,
                      groupIcon: icon
                    })
                  }}
                  className={icon}
                  border={`solid 3px black`}
                  borderRadius={`5px`}
                />
              );
            } else {
              return (
                <Icon
                  key={icon}
                  onClick={() => {
                    setSelectedIcon(icon)
                    setNewGroup({
                      ...newGroup,
                      groupIcon: icon
                    })
                  }}
                  className={icon}
                ></Icon>
              );
            }
          })}
        </IconsContainer>
        <SubmitBtn type="submit" label="submit" onClick={handleSubmit}>
          Submit
        </SubmitBtn>
      </Form>
      <p>{message}</p>
    </Container>
  );
};
export default CreateNewGroup;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;
const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 2%;
`;

const Header = styled.h1`
  width: 60%;
  text-align: right;
  font-size: 22px;
  font-weight: bold;
`;

const CancelBtn = styled.p`
  width: 40%;
  font-size: 20px;
  line-height: 27px;
  color: #28807d;
  &:hover {
    cursor: pointer;
  }
`;
const Form = styled.form`
  display: flex;
  padding: 2%;
  flex-wrap: wrap;
  margin: 0 0 10%;
`;

const Label = styled.label`
  width: 100%;
  margin: 3% 0;
  font-weight: bold;
`;

const Input = styled.input`
    width: 100%;
    padding 1%;
    border: none;
    border-bottom: solid 1px #999898;
    background-color: #F4F8F9;
    margin: 1% 0;
    outline: none
`;

const SubmitBtn = styled.button`
  width: 70%;
  background: #28807d;
  color: white;
  text-align: center;
  font-weight: bold;
  font-size: 1.25rem;
  padding: 4%;
  margin: 8% auto;
  border: 1px solid #28807d;
  border-radius: 5rem;
  &:hover {
    cursor: pointer;
  }
`;
const ColorsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const IconsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 5% 0;
`;

const Icon = styled.i`
  font-size: 5rem;
  paddin: 1%;
  border: ${props => props.border};
  border-radius: ${props => props.borderRadius};
`;

const ColorOption = styled.div`
  width: 80px;
  height: 80px;
  background: ${props => props.color};
  margin: 1%;
  paddin: 1%;
  border: ${props => props.border};
  border-radius: 5px;
`;
