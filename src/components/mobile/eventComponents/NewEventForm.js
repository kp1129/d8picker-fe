import React, {useState, useEffect, useContext} from "react";
import {MobileContext} from '../../../contexts/MobileContexts'
import { useForm } from 'react-hook-form';
import { Button, Input } from '@chakra-ui/core';
import { useAuth} from '../../../contexts/auth';
import styled from 'styled-components';
import {addTemplate} from '../../../utils/helperFunctions'



const EventForm = styled.div`
    // background-color: #AFC9D9;
    background-color: #E5E5E5;
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
    const {setTemplateList, setToggleNav, setNavState, setSumm, setConStart, setConEnd, setTemplateFormOpen,
        setFormOpen} = props;


    const { formOpen} = useContext(MobileContext);

    const { googleApi, api } = useAuth();
    const { currentUser } = googleApi;
    const { register, handleSubmit } = useForm();
    const [input, setInput] = useState({
        summary: "",
        starttime: "",
        endtime: ""
    });

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }





    // Submit for template form
    const onSubmit = async (formData) => {
        const template = addTemplate(formData, currentUser);
        await setTemplateList(prevTemplates => [...prevTemplates, template]);
        setFormOpen(!formOpen);
    };

    return (
        <EventForm>
            <div style={{ background: 'white', marginBottom: '5%', paddingTop: '8%', paddingBottom: '4%', display: 'flex', width: '100%' }}>
                <p style={{ paddingLeft: '2%', color: '#28807D', cursor: 'pointer' }} onClick={()=>setNavState(0)}>Cancel</p>
                <h2 style={{ textAlign: 'right', position: 'relative', left: '30%' }}>New event</h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div style={{ paddingLeft: '5%' }}>Event name</div>
                    <Input
                        type="text"
                        name="summary"
                        placeholder="Event name"
                        ref={register({ maxLength: 80, required: true })}
                        style={{ marginBottom: '5%', background: "white", paddingLeft: '5%'}}
                        value={input.summary}
                        onChange={handleChange}
                    />  
                </div>

                <div>
                <div style={{ paddingLeft: '5%' }}>Description</div>
                    <Input
                        type="text"
                        name="description"
                        placeholder="Event description"
                        ref={register({ maxLength: 100 })}
                        style={{ marginBottom: '5%', background: "white", paddingLeft: '5%' }}
                        
                    />
                </div>

                <div style={{background: 'white'}}>
                <div style={{ paddingLeft: '5%', background:'#E5E5E5' }}>Time</div>
                    <div style={{ backgroundColor: 'white', display: 'flex', justifyContent: 'space-between', 
                    // borderBottom: '1px solid #E5E5E5',
                     paddingTop: '3%', paddingBottom: '3%', marginBottom: '1%' }}>
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
                    <hr style={{width: '90%', margin: "0 auto"}}/>
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
                <Button type="submit" style={{ width: '90%', background: '#28807D', color: 'white', textAlign: 'center', marginTop: '8%', marginBottom: '8%', paddingLeft: 'auto', paddingRight: 'auto', borderRadius: '10px' }}onClick={()=>{
                    setToggleNav(false);
                    setTemplateFormOpen(true)
                    setFormOpen(true)
                    setSumm(input.summary)
                    setConStart(input.starttime);
                    setConEnd(input.endtime);
                    setNavState(0);
                }}>Select dates</Button>
                </div>

            </form>
        </EventForm>
    )
}

export default NewEventForm;