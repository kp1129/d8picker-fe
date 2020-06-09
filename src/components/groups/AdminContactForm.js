import React, { useState } from 'react';
import styled from 'styled-components';
import { axiosWithAuth } from '../../utils/axiosWithAuth';

const AdminContactForm = ({setNavState, groupList}) => {

    const [newContact, setNewContact] = useState({})

    const handleChange = e => {
        setNewContact({
            ...newContact,
            [e.target.name]: e.target.value
        })
    }

    return(
        <Container>
            <Form>
                <div style={{fontWeight: 'bold'}}>Name:</div>
                <NameContainer style={{margin: '1% 0 3%'}}>
                    <FirstName htmlFor="firstName">
                        <Input
                        type="text"
                        placeholder="First name"
                        name="firstName"
                        value={newContact.firstName}
                        onChange={handleChange}
                         />
                    </FirstName>
                    <LastName htmlFor="lastName"> 
                        <Input
                         type="text"
                         placeholder="Last name"
                         name="lastName"
                         value={newContact.lastName}
                         onChange={handleChange}
                         />
                    </LastName>
                </NameContainer>
                <Label htmlFor="phoneNumber">Phone number: 
                    <Input
                     type="text"
                     placeholder="Phone number"
                     name="phoneNumber"
                     value={newContact.phoneNumber}
                     onChange={handleChange}
                     />
                </Label>
                <Label htmlFor="email">Email: 
                    <Input
                     type="text"
                     placeholder="Email"
                     name="email"
                     value={newContact.email}
                     onChange={handleChange}
                     />
                </Label>
                <Label htmlFor="">Group: 
                    <select name="" id="">
                        <option value="">Group name</option>
                        {groupList.map(group => {
                            return(
                            <option key={group.id} value="">{group.groupName}</option>
                            )
                        })}
                    </select>
                </Label>
                    <Btn onClick={()=>{setNavState(0)}}>Cancel</Btn>
                    <Btn type="submit">Save</Btn>
            </Form>
        </Container>
    )
}

export default AdminContactForm;

const Container = styled.div`
    width: 94%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
`

const Form = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
`

const NameContainer = styled.div`
    width: 100%;
    display:flex;
    justify-content: space-between;
`

const FirstName = styled.div`
    width: 48%;
`

const LastName = styled.div`
    width: 48%;
`

const Label = styled.label`
    width: 100%;
    margin: 1% 0 3%; 
    font-weight: bold;
`
const Input = styled.input`
    width: 100%;
    padding 1%;
    border: none;
    border-bottom: solid 1px #999898;
    background-color: #F4F8F9;
    outline: none
`

const Btn = styled.button`
    width: 40%;
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
`