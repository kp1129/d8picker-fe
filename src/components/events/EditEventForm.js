import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@chakra-ui/core';
import { useAuth } from '../../contexts/auth';
import styled from 'styled-components';
import { addTemplate, convertEvents } from '../../utils/helperFunctions'

const EventForm = styled.div`
    // background-color: #AFC9D9;
    background-color: #E5E5E5;
    width: 100%;
    margin: 10%;
`

const EditEventForm = props => {
    const { event, setIsEditing } = props

    const { googleApi, api} = useAuth();
    const { currentUser } = googleApi;

    const { register, handleSubmit } = useForm();
    const [input, setInput] = useState({
        title: event.title,
        notes: event.notes,
        starttime: event.starttime,
        endtime: event.endtime,
        eventDate: event.start.dateTime.substring(0,10)
    });

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleCancelButton = e => {
        e.preventDefault();
        setIsEditing(false);
    }

    const handleSaveButton = async (e) =>{
        e.preventDefault();
        let date = new Date().toString().split("GMT");

        //takes the first few characters of offset with + or - to be slotted in the start and end times
        let zone = date[1].split(' ')[0].slice(0, 3);

        //converts events to user's timezone
        const newEvent = convertEvents([input.date], input.starttime, input.endtime, zone, input.title, input.notes);
        await api.editEvent(event.id, newEvent);
  
        //necessary so that event is sent to api before the page reloads. As of now, page must reload to show new event list that contains the added events
        setTimeout(()=>{window.location.reload(false)}, 500);
    }
    // Submit for template form
    const onSubmit = async (formData) => {
        // console.log("formdata", formData)
        // console.log('googleApi: ', googleApi);
        // setToggleNav(false);
        // setTemplateFormOpen(true)
        // setFormOpen(true)
        // setTitle(input.title)
        // setNotes(input.notes)
        // setConStart(input.starttime);
        // setConEnd(input.endtime);
        // setNavState(0);

        addTemplate(formData, currentUser);
        // console.log('template?: ', template);
        // console.log('templateList: ', templateList);
        // setTemplateList([...templateList, template]);
        // setFormOpen(!formOpen);
    };

    return (
        <EventForm>
            {/* <div style={{ background: 'white', marginBottom: '5%', paddingTop: '8%', paddingBottom: '4%', display: 'flex', width: '100%' }}>
                <p style={{ paddingLeft: '2%', color: '#28807D', cursor: 'pointer' }} onClick={() => setNavState(0)}>Cancel</p>
                <h2 style={{ textAlign: 'right', position: 'relative', left: '30%' }}>New event</h2>
            </div> */}

            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div style={{ color: 'black', paddingLeft: '5%' }}>Event name</div>
                    <Input
                        type="text"
                        name="title"
                        placeholder="Event name"
                        ref={register({ maxLength: 80, required: true })}
                        style={{ marginBottom: '5%', background: "black", paddingLeft: '5%' }}
                        value={input.title}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <div style={{ color: 'black', paddingLeft: '5%' }}>Notes</div>
                    <Input
                        type="text"
                        name="notes"
                        placeholder="Event notes"
                        ref={register({ maxLength: 100 })}
                        style={{ marginBottom: '5%', background: "black", paddingLeft: '5%' }}
                        value={input.notes}
                        onChange={handleChange}
                    />
                </div>

                <div style={{ background: 'white' }}>
                    <div style={{ paddingLeft: '5%', background: 'black' }}>Time</div>
                    <div style={{
                        backgroundColor: 'black', display: 'flex', justifyContent: 'space-between',
                        paddingTop: '3%', paddingBottom: '3%', marginBottom: '1%'
                    }}>
                        <p style={{ paddingLeft: '5%' }}>starts</p>
                        <Input
                            type="time"
                            name="starttime"
                            ref={register({ required: true })}
                            style={{ width: '65%', border: 'none', background: "black", paddingLeft: '5%' }}
                            value={input.starttime}
                            onChange={handleChange}
                        />
                    </div>
                    <hr style={{ width: '90%', margin: "0 auto" }} />
                    <div style={{ backgroundColor: 'black', display: 'flex', justifyContent: 'space-between', paddingTop: '3%', marginBottom: '1%' }}>
                        <p style={{ paddingLeft: '5%' }}>ends</p>
                        <Input
                            type="time"
                            name="endtime"
                            ref={register({ required: true })}
                            style={{ width: '65%', border: 'none', marginBottom: '3%', background: "black", paddingLeft: '5%' }}
                            value={input.endtime}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div style={{ width: '100%', textAlign: 'center' }}>
                    {/* <button type="submit" style={{ width: '30%', background: '#28807D', color: 'white', textAlign: 'center', fontWeight: "bold", fontSize: '1.1rem', marginTop: '8%', marginBottom: '8%', padding: '4%', borderRadius: '10px' }}

                    >Change Dates</button> */}
                    <button onClick={handleSaveButton} style={{ width: '30%', background: '#28807D', color: 'white', textAlign: 'center', fontWeight: "bold", fontSize: '1.1rem', margin: '8%', padding: '4%', borderRadius: '10px' }}>Save Changes</button>
                    <button onClick={handleCancelButton} style={{ width: '30%', background: '#28807D', color: 'white', textAlign: 'center', fontWeight: "bold", fontSize: '1.1rem', margin: '8%', padding: '4%', borderRadius: '10px' }}>Cancel</button>
                </div>

            </form>
        </EventForm>
    )
}

export default EditEventForm;
