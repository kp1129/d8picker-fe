import React, {useContext, useEffect, useState} from 'react'
import { useAuth } from '../../contexts/auth';
import { Context } from '../../contexts/Contexts';
import axiosWithAuth from '../../utils/axiosWithAuth';
import styled from 'styled-components';
import circleBtn from '../navigation/circle-plus.png';
import {Image} from '@chakra-ui/core';

const Contacts = ({ setNavState }) => {

    const { googleApi } = useAuth();
    const { currentUser } = googleApi;
    const { token } = currentUser;
    const { adminInfo } = useContext(Context);

    //state to hold current profile image
    const [img, setImg] = useState(currentUser.photoUrl);

    // need to change to user profile 
    useEffect(()=>{
        setImg(currentUser.photoUrl)
    },[])

    const [viewContacts, setViewContacts] = useState([]);

    const handleChange = e => {
        setViewContacts([
            ...viewContacts
        ])
    };

    // retrieves all contacts and sorts by first name
    const getAllContacts = () => {
        let sortAllContacts = []
        axiosWithAuth(token)
        .get(`/api/contacts/${adminInfo.adminId}`)
        .then(res => {
            console.log(res.data.contacts)
            sortAllContacts = [...res.data.contacts]
            sortAllContacts.sort((a, b) => {
                let name1 = a.firstName.toUpperCase();
                let name2 = b.firstName.toUpperCase();
                if (name1 < name2) {
                    return -1;
                  }
                if (name1 > name2) {
                    return 1;
                  }
                  return 0;
            })
            setViewContacts([...sortAllContacts])
        })
        .catch(error => {
            console.log(error)
        })
    }
    console.log('Contacts,', viewContacts)

    useEffect(() => {
        getAllContacts()
    }, [])

    return(
        <Container>
            <NavContainer >
                <ContactTitle className='contacts' onClick={handleChange}>Contacts</ContactTitle>
                <p style={{ color: '#AFC9D9', fontSize: '1rem' }} onClick={() => {setNavState(5)}}>Back</p>
            </NavContainer>
            <ContactDiv className='contacts' onClick={() => {setNavState(6)}}>
            {viewContacts.map((contact, index) => {
                return(
                <Contact key={index} >
                     <Image
                        square="full"
                        size="45px"
                        src={img}
                        alt="avatar"
                        style={{marginTop: '0px', marginLeft: "10px", marginBottom: "0px", borderRadius: '0 6px 6px 6px'}}
                        />
                    <div style={{ marginLeft: '15px'}}>
                    <ContactNames>{contact.firstName}</ContactNames>
                    <IconDiv>
                        <Icons className="fas fa-phone"></Icons>
                        <Icons className="fas fa-comment-medical"></Icons>
                        <Icons className="fas fa-envelope"></Icons>
                    </IconDiv>
                    </div>
                </Contact>
                )
            })}
            <BtnDiv>
                <img src={circleBtn} onClick={()=>{setNavState(6)}}></img>
                <Button>Add to group</Button>
            </BtnDiv>
            <BtnDiv>
                <BtnContact1 style={{ background: 'white', border: '2px solid #28807D', color: '#28807D' }}>Add Contact</BtnContact1>
                <BtnContact2>Invite Contact</BtnContact2>
            </BtnDiv>
            </ContactDiv>
        </Container>
    )
}

export default Contacts;

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 5% 5% 0 5%;
`
const NavContainer = styled.div`
    width: 92%;
    display: flex; 
    flex-wrap: nowrap;
    align-content: flex-start;
    justify-content: space-around;
    padding: 4% 8% 2% 3%;
    position: fixed;
    top: 0;
`;
const IconDiv= styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
`;

const Icons = styled.i`
    font-size: 1.4rem;
    color: #AFC9D9;
    margin: 0 10%;
`;
const ContactDiv = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 10% 0 0 0;
`
const Contact = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    margin: 5%;
`
const ContactTitle = styled.p`
    width: 92%;
    font-size: 1.2rem;
    display: flex;
    justify-content: flex-start;
`
const ContactNames = styled.p`
    font-size: 1rem;
    color: #2E5780;
    padding-bottom: 2%;
`;
const Button = styled.button`
    border: 4px solid #28807D;
    background: #28807D;
    color: white;
    padding: 3px 50px;
    border-radius: 9px;
`;
const BtnDiv = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 8% 3%;
`;

const BtnContact1 = styled.button`
    border: 4px solid #28807D;
    padding: 3px 50px;
    border-radius: 9px;
    margin: 3%;
`;
const BtnContact2 = styled.button`
    border: 4px solid #28807D;
    background: #28807D;
    color: white;
    padding: 3px 50px;
    border-radius: 9px;
    margin: 3% 0;
`;
