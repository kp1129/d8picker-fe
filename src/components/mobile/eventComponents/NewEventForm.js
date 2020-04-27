import React from "react";
import { useForm } from 'react-hook-form';
import { Button, Input } from '@chakra-ui/core';
import { useAuth} from '../../../contexts/auth';
import styled from 'styled-components';
import {addTemplate} from '../../../utils/helperFunctions'


const EventForm = styled.div`
    background-color: #AFC9D9;
    width: 100%;
`
const NewEventHead = styled.div`
    background-color: white;
    margin-bottom: 10%;
    border: 1px dashed black;
    padding-top: 15%;
    padding-bottom: 4%;
`


const NewEventForm = props => {
    const { setFormOpen, setTemplateList, currentUser, formOpen } = props;
    const { googleApi, api } = useAuth();
    const { register, handleSubmit } = useForm();

    // Submit for template form
    const onSubmit = async formData => {
        const template = addTemplate(formData, currentUser);
        await setTemplateList(prevTemplates => [...prevTemplates, template]);
        setFormOpen(!formOpen);
    };

    return (
        <EventForm>
            <div style={{ background: 'white', marginBottom: '5%', paddingTop: '25%', paddingBottom: '4%', display: 'flex', width: '100%' }}>
                <p style={{ paddingLeft: '2%', color: '#28807D' }}>Cancel</p>
                <h2 style={{ textAlign: 'right', position: 'relative', left: '30%' }}>New event</h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div style={{ paddingLeft: '5%' }}>Event name</div>
                    <Input
                        type="text"
                        name="event-name"
                        placeholder="Event name"
                        ref={register({ maxLength: 80, required: true })}
                        style={{ marginBottom: '5%' }}
                    />  
                </div>

                <div>
                <div style={{ paddingLeft: '5%' }}>Description</div>
                    <Input
                        type="text"
                        name="event-description"
                        placeholder="Event description"
                        ref={register({ maxLength: 100 })}
                        style={{ marginBottom: '5%' }}
                    />
                </div>

                <div>
                <div style={{ paddingLeft: '5%' }}>Time</div>
                    <div style={{ backgroundColor: 'white', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid grey', paddingTop: '3%', paddingBottom: '3%' }}>
                        <p style={{ paddingLeft: '5%' }}>starts</p>
                        <Input
                            type="time"
                            name="starttime"
                            ref={register({ required: true })}
                            style={{ width: '65%', border: 'none' }}
                        />
                    </div>

                    <div style={{ backgroundColor: 'white', display: 'flex', justifyContent: 'space-between', paddingTop: '3%' }}>
                        <p style={{ paddingLeft: '5%' }}>ends</p>
                        <Input
                            type="time"
                            name="endttime"
                            ref={register({ required: true })}
                            style={{ width: '65%', border: 'none', marginBottom: '3%' }}
                        />
                    </div>
                </div>

                <div style={{ width: '100%', textAlign: 'center' }}>
                <Button type="submit" style={{ width: '90%', background: '#28807D', color: 'white', textAlign: 'center', marginTop: '8%', marginBottom: '8%', paddingLeft: 'auto', paddingRight: 'auto', borderRadius: '10px' }}>Select dates</Button>
                </div>

            </form>
        </EventForm>
    )
}

export default NewEventForm;