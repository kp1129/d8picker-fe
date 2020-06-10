import React, { useContext, useEffect, useState } from 'react';
import { useAuth } from '../../contexts/auth';
import { Context } from '../../contexts/Contexts';
import axiosWithAuth from '../../utils/axiosWithAuth';
import styled from 'styled-components';
import circleBtn from '../navigation/circle-plus.png';

const Contacts = ({ setNavState }) => {

    const { googleApi } = useAuth();
    const { currentUser } = googleApi;
    const { token } = currentUser;
    const { adminInfo } = useContext(Context);

    const [viewContacts, setViewContacts] = useState([]);
    const [navToggle, setNavToggle] = useState(false);

    const handleChange = e => {
        setViewContacts([
            ...viewContacts
        ])
        setNavState(7)
        setNavToggle(true)
    };

    const handleGroups = e => {
        setNavToggle(navToggle)
        setNavState(2)
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
            <NavContainer>
                <ContactTitle className='contacts' onClick={handleChange} style={{ alignContent: 'flex-start'}}>Contacts</ContactTitle>
              
                <p style={{ color: '#AFC9D9', fontSize: '1rem' }} onClick={handleGroups}>Back</p>
               
            </NavContainer>
             <TabsContainer>
                    <Tabs onClick={handleGroups}>Groups</Tabs>
                    <Tabs className='contact' onClick={() => setNavState(7) && setNavToggle(!navToggle)}>Contacts</Tabs>
                </TabsContainer>
            <ContactDiv className='contacts' onClick={() => {setNavState(7)}}>
            {viewContacts.map((contact, index) => {
                return(
                <Contact key={index} >
                    {/* Placeholder image */}
                    <i className="fas fa-user-alt" style={{ fontSize: '2.6rem', color: '#28807D', padding: '5px 2px 1px 2px', borderRadius: '0 9px 9px 9px' }}></i>
                    <div style={{ marginLeft: '15px'}}>
                    <ContactNames>
                        {contact.firstName} {''}
                        {contact.lastName}
                    </ContactNames>
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
                <img src={circleBtn} onClick={()=>{setNavState(5)}}></img>
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
    justify-content: flex-end;
    padding: 4% 0 1% 3%;
    top: 0;
`;
const TabsContainer = styled.div`
    width: 100%;
    display: flex;
    justify-items: flex-end;
    margin-left: 75%;
`;

const Tabs = styled.button`
    display: flex;
    align-items: center;
    justify-content: space-between;

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
    margin-top: 2%;
`
const Contact = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    margin: 5% 2%;
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

