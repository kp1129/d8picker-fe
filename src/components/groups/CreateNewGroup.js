import React, { useState, useContext } from 'react';
import { useAuth } from '../../contexts/auth';
import styled from 'styled-components';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
// import { useToasts } from 'react-toast-notifications';

const CreateNewGroup = ({setNavState, setGroupList}) => {

    //needed variables for first axios call, current user object and token from currentUser object
    const { googleApi } = useAuth();
    const { currentUser } = googleApi;
    const { token, adminId } = currentUser;

    const [newGroup, setNewGroup] = useState({
        groupName: '',
        groupDescription: '',
        adminId: adminId
    });

    const [message, setMessage] = useState('')

    const handleChange = e => {
        setNewGroup({
            ...newGroup,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log('ADMIN ID: ', adminId)
        if(!newGroup.groupName){
            (setMessage('Please provide a name for your group'))
        }
        console.log('newGroup: ', newGroup)
        axiosWithAuth(token)
        .post(`/api/groups/${adminId}`, newGroup)
        .then(async res => {
            console.log(res.data.groups)
            await setGroupList([...res.data.groups])
            setNavState(2)
        })
        .catch(err => {
            console.log('ERROR 2: ', err)
        })
    }

    return (
        <Container>
            <HeaderContainer>
                <CancelBtn onClick={() => {setNavState(2)}}>Cancel</CancelBtn>
                <Header>New Group</Header>
            </HeaderContainer>
            <Form >
                <Label htmlFor="groupName" style={{fontWeight: 'bold'}}> Group Name: 
                    <Input
                    type="text"
                    placeholder="New Group Name"
                    name="groupName"
                    value={newGroup.groupName}
                    onChange={handleChange}
                    />
                </Label>

                <br/>

                <Label htmlFor="groupName" style={{fontWeight: 'bold'}}> Group Description: 
                    <Input
                    type="text"
                    placeholder="New Group Description"
                    name="groupDescription"
                    value={newGroup.groupDescription}
                    onChange={handleChange}
                    />
                </Label>
                <SubmitBtn type="submit" label="submit" onClick={handleSubmit}>Submit</SubmitBtn>
            </Form>
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
const HeaderContainer = styled.div`
    width: 100%;
    display: flex;
    padding: 2%;
`

const Header = styled.h1`
    width: 60%;
    text-align: right;
    font-size: 22px;
    font-weight: bold;
`

const CancelBtn = styled.p`
    width: 40%;
    font-size: 20px;
    line-height: 27px;
    color: #28807D;
    &:hover {
        cursor: pointer;
        }
`
const Form = styled.form`
    display: flex;
    padding: 2%;
    flex-wrap: wrap;
`

const Label = styled.label`
    width: 100%;
    margin: 3% 0;
`

const Input = styled.input`
    width: 100%;
    padding 1%;
    border: none;
    border-bottom: solid 1px #999898;
    background-color: #F4F8F9;
    margin: 1% 0;
    outline: none
`

// const InputTextArea = styled.textarea`
//     width: 100%;
//     border: none;
//     border-bottom: solid 2px #999898;
//     background-color: #F4F8F9;
//     margin: 1% 0;
//     outline: none;
// `

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
`