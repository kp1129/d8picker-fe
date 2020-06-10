import React, { useState, useEffect, useContext } from 'react';
import {useParams} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import {Context} from '../../contexts/Contexts';
import {useAuth} from '../../contexts/auth';
import axiosWithAuth from '../../utils/axiosWithAuth';
import { useToasts } from 'react-toast-notifications';

const AddContactForm = () => {
  const { register, handleSubmit, errors } = useForm();

  const { addToast } = useToasts();

  const {setNavState} = useContext(Context);
  const {googleApi} = useAuth();
  const {currentUser} = googleApi;
  const [input, setInput] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    groupId: ''
  });

  const handleChange = e => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  };
 
  
  const onSubmit = data => {
    // format phone number
    const re = /\D/g;
    let cleanPhoneNumber = data.phoneNumber.replace(re, "");    
    const payload = {
      ...input,
      phoneNumber: cleanPhoneNumber,
      adminId: adminInfo.adminId
      // groupId: groupInfo.groupId
    }   
    // if the user is admin
     axiosWithAuth(currentUser.token).post("/api/contacts/", payload)
     .then(res => {
       console.log("response from the post request", res);
       if(res.status === 201){
        //  notify the user that contact was successfully created
        addToast('Contact added!', {
          appearance: 'info',
          autoDismiss: true,
          autoDismissTimeout: 6000
        });
        // redirect the user
        setNavState(1);
       }
      
      })
     .catch(err => console.log(err))

    // if the user is not admin

  };
  
  console.log(errors);

  

  // adminInfo and groupInfo
  // const [adminInfo, setAdminInfo] = useState({});
  const {adminInfo} = useContext(Context);
  const [groupInfo, setGroupInfo] = useState({});
  
  // check to see if link is invalid
  const [linkValidity, setLinkValidity] = useState(true);
  // check to see if the user is admin
  const [isAdmin, setIsAdmin] = useState(false);

  const { groupInviteHash } = useParams();

  useEffect(() => {
    // check to see if the URL has groupInviteHash
   if(groupInviteHash){
      // also use verify endpoint in backend to verify the hash
      // const response = axios call to backend with groupInviteHash
      // // if verified, set isAdmin to false, store group and admin information
        setIsAdmin(false);
        // setLinkValidity(true);
        // setAdminInfo(res.data.adminInfo);
        // setGroupInfo(res.data.groupInfo);
      // if not verified
        // setLinkValidity(false);
   } else { // else if no groupInviteHash in the link set isAdmin to true and adminInfo from context
      setIsAdmin(true);
      // setAdminInfo(useContext(Context).adminInfo)
    }
  }, [groupInviteHash]);


  return (
    <AddContact>
      {!linkValidity && (
        <Headline>
        <Tag>This link has expired</Tag>
       </Headline>
      )}
      {linkValidity && !isAdmin && (
        <Headline>
        
          <Tag>You've been invited to join:</Tag>
          <GroupName>Girls Junior Varsity Basketball</GroupName>
        </Headline>
      )}
      { linkValidity && (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Tag>Name</Tag>
        <NameDiv>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            type="text"
            placeholder="First name"
            name="firstName"
            onChange={handleChange}
            ref={register({ required: true, maxLength: 80 })}
          />
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            type="text"
            placeholder="Last name"
            name="lastName"
            onChange={handleChange}
            ref={register({ required: true, maxLength: 100 })}
          />
        </NameDiv>
        <Tag>Phone number</Tag>
        <Label htmlFor="phoneNumber">Phone number</Label>
        <Input
          type="tel"
          placeholder="1234567890"
          name="phoneNumber"
          id="phoneNumber"
          
          ref={register({required: true, maxLength: 14, pattern: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/i})} 
        />
       

        
        <Tag>Email</Tag>
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          placeholder="Email address"
          name="email"
          id="email"
          onChange={handleChange}
          ref={register({ required: false, pattern: /^\S+@\S+$/i })}
        />
        {isAdmin && (
          <GroupDiv>
            <Tag>Group</Tag>
            <Label htmlFor="groupId">Group</Label>
            <select onChange={handleChange} name="groupId" id="groupId" ref={register({ required: true })}>
              <option value="1">Group1</option>
              <option value="2">Group2</option>
              <option value="3">Group3</option>
            </select>
          </GroupDiv>
        )}
        <ButtonDiv>
          <CancelBtn>Cancel</CancelBtn>
          <SaveBtn><button type="submit">Save</button></SaveBtn>
        </ButtonDiv>
      </Form>
      )}
    </AddContact>
  );
};

// styled components
const size = {
  tablet: '768px',
  desktop: '1024px'
};
const device = {
  desktop: `(min-width: ${size.desktop})`
};

const AddContact = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
`;

const Headline = styled.div`
  width: 90%;
  margin: 0 auto;
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

const GroupName = styled.div`
  font-size: 1.15rem;
  width: 80%;
  text-align: center;
  border-radius: 5px;
  color: #c70c00;
  font-weight: bold;
  background: #f8dfde;
`;

const NameDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Input = styled.input`
  border-bottom: 1px solid gray;
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

export default AddContactForm;
