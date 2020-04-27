import React from "react";
import { useForm } from 'react-hook-form';
import { Button, Input } from '@chakra-ui/core';
import { useAuth} from '../../../contexts/auth';
import styled from 'styled-components';
import {addTemplate} from '../../../utils/helperFunctions'


const EventForm = styled.div`
    background-color: #AFC9D9;
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
            <NewEventHead>
                <h2 style={{ textAlign: 'center' }}>New event</h2>
            </NewEventHead>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="event-name">Event name</label>
                    <Input
                        type="text"
                        name="event-name"
                        ref={register({ maxLength: 80, required: true })}
                        style={{ marginBottom: '15%' }}
                    />  
                </div>

                <div>
                    <label htmlFor="event-description">Description</label>
                    <Input
                        type="text"
                        name="event-description"
                        ref={register({ maxLength: 100 })}
                    />
                </div>

                <div>
                    <h3>Time</h3>
                    <div style={{ backgroundColor: 'white', display: 'flex', justifyContent: 'space-between' }}>
                        <p>starts</p>
                        <Input
                            type="time"
                            name="starttime"
                            ref={register({ required: true })}
                            style={{ width: '65%' }}
                        />
                    </div>

                    <div style={{ backgroundColor: 'white', display: 'flex', justifyContent: 'space-between' }}>
                        <p>ends</p>
                        <Input
                            type="time"
                            name="endttime"
                            ref={register({ required: true })}
                            style={{ width: '65%', marginBottom: '30%' }}
                        />
                    </div>
                </div>

                <Button type="submit" style={{ background: '#28807D', color: 'white', marginLeft: 'auto', marginRight: 'auto', borderRadius: '10px' }}>Select Dates</Button>
            </form>
        </EventForm>
    )
}

export default NewEventForm;