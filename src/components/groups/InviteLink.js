import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import {Context} from '../../contexts/Contexts';
import {useAuth} from '../../contexts/auth';
import axiosWithAuth from '../../utils/axiosWithAuth';
import { useToasts } from 'react-toast-notifications';

const InviteLink = () => {
  const {groupList} = useContext(Context);
  const { register, handleSubmit, errors } = useForm();

  const {googleApi} = useAuth();
  const {currentUser} = googleApi;

  // state for group id
  const [groupID, setGroupID] = useState('');

  // state for invite link
  const [groupInviteLink, setGroupInviteLink] = useState('');

  const handleChange = e => {
    setGroupID(e.target.value);
  };
  
  console.log(errors);

  const {adminInfo, setNavState} = useContext(Context);


  const handleCancel = () => {
    setNavState(2);
  }
  const onSubmit = data => {
    axiosWithAuth(currentUser.token)
        .get(`/api/groups/${adminInfo.adminId}/${groupID}`)
        .then(res => {
            console.log(res.data);
            console.log(`Invite Link Generated: ${process.env.REACT_APP_BASE_URL}/invitee/${res.data.groups[0].groupInviteHash}`);
            setGroupInviteLink(`${process.env.REACT_APP_BASE_URL}/invitee/${res.data.groups[0].groupInviteHash}`);
        })
        .catch(err => console.log('error in getting invite link', err));
  };

  return (
    <InviteLinkContainer>
        {!groupInviteLink && (
            <Form onSubmit={handleSubmit(onSubmit)}>
                <GroupDiv>
                    <Tag>Group</Tag>
                    <Label htmlFor="groupId">Group</Label>
                    <select onChange={handleChange} name="groupId" id="groupId" ref={register({ required: true })}>
                    {groupList.map(g => {
                        return (
                        <option value={g.id}> {g.groupName} </option>
                        )
                    })}
                    </select>
                </GroupDiv>
                <ButtonDiv>
                <SaveBtn><button type="submit">Generate Invite Link</button></SaveBtn>
                <CancelBtn><button onClick={handleCancel}>Cancel</button></CancelBtn>
                </ButtonDiv>
            </Form>
        )}
        {groupInviteLink && (
            <LinkContainer>
            <Headline>Invite Link Generated Successfully!</Headline>
            <GroupDiv>
                {groupInviteLink}
            </GroupDiv>
            </LinkContainer>
        )}
    </InviteLinkContainer>
  );
};

export default InviteLink;

// styled components
const size = {
  tablet: '768px',
  desktop: '1024px'
};
const device = {
  desktop: `(min-width: ${size.desktop})`
};

const InviteLinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
`;

const Headline = styled.div`
  width: 90%;
  margin: 0 auto;
`;

const LinkContainer = styled.div`
  font-size: 1.15rem;
  width: 80%;
  text-align: center;
  border-radius: 5px;
  color: #c70c00;
  font-weight: bold;
  background: #f8dfde;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 0 auto;

  #firstName,
  #lastName {
    width: 45%;
  }
`;

const Tag = styled.p`
  font-size: 1.15rem;
  font-weight: bold;
  margin: 1rem 0;
`;


const GroupDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 5%;
`;

const SaveBtn = styled.div`
  width: 48%;
  background: #28807d;
  color: white;
  text-align: center;
  font-weight: bold;
  font-size: 1.15rem;
  padding: 2%;
  margin: 2%; auto;
  border: 2px solid #28807d;
  border-radius: 5rem;
  &:hover {
    cursor: pointer;
  }
  @media ${device.desktop} {
    width: 30%; 
    padding: 2%;
    margin: 0;
    }
`;

const CancelBtn = styled.div`
  width: 48%;
  color: #28807d;
  background: white;
  text-align: center;
  font-weight: bold;
  font-size: 1.15rem;
  padding: 2%;
  margin: 2% auto;
  border: 1px solid #28807d;
  border-radius: 5rem;
  &:hover {
    cursor: pointer;
  }
  @media ${device.desktop} {
    width: 30%;
    padding: 2%;
    margin: 0;
  }
`;

// the code below makes the labels invisible
// so that they're hidden visually but
// still available to screen readers
const Label = styled.label`
    border: 0;
    clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
    clip; rect(1px, 1px, 1px, 1px);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
`;