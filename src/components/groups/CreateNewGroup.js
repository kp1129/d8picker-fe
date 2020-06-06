import React, { useState, useContext } from 'react';
import { useAuth } from '../../contexts/auth';
import styled from 'styled-components';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import useGapi from '../../hooks/useGapi';
// import { useToasts } from 'react-toast-notifications';

const CreateNewGroup = ({setNavState}) => {

    //needed variables for first axios call, current user object and token from currentUser object
    const { googleApi } = useAuth();
    const { currentUser } = googleApi;
    const { token } = currentUser;

    const [newGroup, setNewGroup] = useState({
        groupName: '',
        groupDescription: '',
    });

    const [message, setMessage] = useState('')

    const handleChange = e => {
        setNewGroup({
            ...newGroup,
            [e.target.name]: e.target.value
        })
    }

    //call will add or check fur the user in the database, return adminId,
    //then add adminId as a value to newGroup object to be posted
    const handleSubmit = e => {
        e.preventDefault();
        if(!newGroup.groupName){
            (setMessage('Please provide a name for your group'))
        }
        axiosWithAuth(token)
        .post('/api/admin', currentUser)
        .then(res => {
            console.log(res.data);
            setNewGroup({
                ...newGroup,
                adminId: res.data.adminId
            })
            console.log('newGroup: ', newGroup)
            axiosWithAuth(token)
            .post('/api/groups', newGroup)
            .then(res => {
                console.log('RESPONSE: ', res)
            })
            .catch(err => {
                console.log('ERROR 2: ', err)
            })
        })
        .catch(err => {
            console.log('ERROR 1: ', err)
        })
    }

    return (
        <Container>
            <Cancel onClick={() => {setNavState(2)}}>Cancel</Cancel>
            <Header>New Group</Header>
            <form onSubmit={handleSubmit}>
                <label htmlFor="groupName"> Group Name: 
                    <Input
                    type="text"
                    placeholder="New Group Name"
                    name="groupName"
                    value={newGroup.groupName}
                    onChange={handleChange}
                    />
                </label>

                <br/>

                <label htmlFor="groupName"> Group Description: 
                    <InputTextArea
                    type="text"
                    placeholder="New Group Description"
                    name="groupDescription"
                    value={newGroup.groupDescription}
                    onChange={handleChange}
                    />
                </label>
                <button type="submit" label="submit">Submit</button>
            </form>
            <p>{message}</p>
        </Container>
    )
}

export default CreateNewGroup

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
`

const Header = styled.h1`
    width: 60%;
    font-size: 22px;
`

const Cancel = styled.p`
    width: 40%;
    font-size: 20px;
    line-height: 27px;
    color: #28807D;

`

const Input = styled.input`
    width: 100%;
`

const InputTextArea = styled.textarea`
    width: 100%;
`