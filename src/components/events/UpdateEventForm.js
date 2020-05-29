import React, { useState, useContext } from "react";
import {Context } from '../../contexts/Contexts'
import { useForm } from 'react-hook-form';
import { Input } from '@chakra-ui/core';
import { useAuth } from '../../contexts/auth';
import styled from 'styled-components';
import { updateTemplate } from '../../utils/helperFunctions'
import { useToasts } from 'react-toast-notifications'

// this component is to update event templates - in the events tab

const EventForm = styled.div`
    // background-color: #AFC9D9;
    background-color: #E5E5E5;
    width: 100%;
    height: 100vh;
`

const UpdateEventForm = props => {
    const { setTemplateList, templateList, setToggleNav, setNavState, setTitle, setConStart, setConEnd, setTemplateFormOpen,
        setFormOpen } = props;

    const { formOpen, templateIdToUpdate } = useContext(Context);
    console.log('template id of the template to update', templateIdToUpdate);
    const { googleApi} = useAuth();
    const { currentUser } = googleApi;
    const { register, handleSubmit } = useForm();
    const [[templateToUpdate], setTemplateToUpdate] = useState(templateList.filter(each => each.id === templateIdToUpdate));
    console.log('is the template undefined or empty?', templateToUpdate);

    const [input, setInput] = useState({
        title: templateToUpdate.title,
        notes: templateToUpdate.notes,
        starttime: templateToUpdate.starttime,
        endtime: templateToUpdate.endtime
    });
    const { addToast } = useToasts();

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    // Submit for template form
    const onSubmit = async (formData) => {
        addToast('Event Updated!', {
             appearance: 'info',
             autoDismiss: true,
             autoDismissTimeout: 6000
            })
        console.log("formdata", formData)
        console.log('googleApi: ', googleApi);
        setToggleNav(false);
        setTemplateFormOpen(true)
        setFormOpen(true)
        setTitle(input.title)
        setConStart(input.starttime);
        setConEnd(input.endtime);
        setNavState(0);

        const template = updateTemplate(templateIdToUpdate, formData, currentUser, googleApi.IDToken);
        console.log('template?: ', template);
        console.log('templateList: ', templateList);
        setTemplateList([...templateList, template]);
        setFormOpen(!formOpen);
    };

    return (
        <EventForm>
            <div style={{ background: 'white', marginBottom: '5%', paddingTop: '8%', paddingBottom: '4%', display: 'flex', width: '100%' }}>
                <p style={{ paddingLeft: '2%', color: '#28807D', cursor: 'pointer' }} onClick={() => setNavState(0)}>Cancel</p>
                <h2 style={{ textAlign: 'right', position: 'relative', left: '30%' }}>Update Event</h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div style={{ paddingLeft: '5%' }}>Event name</div>
                    <Input
                        type="text"
                        name="title"
                        placeholder="Event name"
                        ref={register({ maxLength: 80, required: true })}
                        style={{ marginBottom: '5%', background: "white", paddingLeft: '5%' }}
                        value={input.title}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <div style={{ paddingLeft: '5%' }}>Notes</div>
                    <Input
                        type="text"
                        name="notes"
                        placeholder="Event notes"
                        value={input.notes}
                        onChange={handleChange}
                        ref={register({ maxLength: 100 })}
                        style={{ marginBottom: '5%', background: "white", paddingLeft: '5%' }}
                    />
                </div>

                <div style={{ background: 'white' }}>
                    <div style={{ paddingLeft: '5%', background: '#E5E5E5' }}>Time</div>
                    <div style={{
                        backgroundColor: 'white', display: 'flex', justifyContent: 'space-between',
                        paddingTop: '3%', paddingBottom: '3%', marginBottom: '1%'
                    }}>
                        <p style={{ paddingLeft: '5%' }}>starts</p>
                        <Input
                            type="time"
                            name="starttime"
                            ref={register({ required: true })}
                            style={{ width: '65%', border: 'none', background: "white", paddingLeft: '5%' }}
                            value={input.starttime}
                            onChange={handleChange}
                        />
                    </div>
                    <hr style={{ width: '90%', margin: "0 auto" }} />
                    <div style={{ backgroundColor: 'white', display: 'flex', justifyContent: 'space-between', paddingTop: '3%', marginBottom: '1%' }}>
                        <p style={{ paddingLeft: '5%' }}>ends</p>
                        <Input
                            type="time"
                            name="endtime"
                            ref={register({ required: true })}
                            style={{ width: '65%', border: 'none', marginBottom: '3%', background: "white", paddingLeft: '5%' }}
                            value={input.endtime}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div style={{ width: '100%', textAlign: 'center' }}>
                    <button type="submit" style={{ width: '70%', background: '#28807D', color: 'white', textAlign: 'center', fontWeight: "bold", fontSize: '1.1rem', marginTop: '8%', marginBottom: '8%', padding: '4%', borderRadius: '10px' }}

                    >Select dates</button>
                </div>

            </form>
        </EventForm>
    )
}

export default UpdateEventForm;