import React, { useState, useEffect } from 'react';
import Calendar from './Calendar/Calendar';
import Logo from '../../img/d8picker.png';
import favicon from '../../img/white.png';
import Template from './Template';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import dayjs from 'dayjs'

import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { axiosByGid } from '../../utils/axiosByGid';

const Home = () => {
  const [data, setData] = useState({});
  const [date, setDate] = useState(dayjs());

  const [events, setEvents] = useState([]);
  const [templateFormOpen, setTemplateFormOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [selected, setSelected] = useState([])

// January = 0
  const [templateList, setTemplateList] = useState([
    {
      summary:'earning income',
      description:'getting money',
      starttime:'12:30',
      endtime:"14:45"
    }
  ]);
  const { register, handleSubmit, errors } = useForm();

  // Submit for template form
  const onSubmit = formData => {
    const template = {
      ...formData,
      googleId: localStorage.getItem('googleId:')
    };
    console.log('template', template);
    // axios
    //   .post(`${process.env.REACT_APP_ENDPOINT_URL}/api/template`, template)
    //   .then(res => {
    //     console.log('Template Post', res);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
    setTemplateList(templateList.concat(template))
  };


  useEffect(() => {
    const url =
      process.env.NODE_ENV === 'development'
        ? '/api/events'
        : `${process.env.REACT_APP_ENDPOINT_URL}/api/events`;

      // Call for google for user events
    (async () => {
      const res = await axiosWithAuth().get(url);
      const results = await res.data;
      localStorage.setItem('googleId:', res.data.googleId);
      console.log('results: ', results);
      setData(results);
      setEvents(results.events);
  
      // call BE for templates by googleId
      // this  needs to be reformatted to be dynamic !!!!!!!!!!!!!!
      (async () => {
        await axiosByGid()
          .get(`/api/template`)

          .then(res => {
            setTemplateList(res.data)
          })
          .catch(err => {
            console.log(err);
          });
      })();
    })();
  }, [templateList]);

    //yall need to fighure
  const applyTemplate = (summary, description, starttime, endtime) => {
    console.log(selected)
    console.log(summary)

    //dateTime: "2020-02-28T08:30:00-08:00"

  //   const dateTime:''
  // 
  }

  return (
    <div className="home">
      <div className="navbar">
        <img src={favicon} alt="" className="favicon" />
        <h2>Sign Out</h2>
      </div>
      <main className="main">
        <div className="left">
          <div className="profile">
            <img className="profile-img" src={data.photoUrl} alt="" />
            <h3>{data.name}</h3>
          </div>
          <div className="template">
            <h2>templates</h2>
            {templateList.map(t => (
              <Template
                key={t.id}
                starttime={t.starttime}
                endtime={t.endtime}
                summary={t.summary}
                description={t.description}
                templateFormOpen={templateFormOpen}
                setTemplateFormOpen={setTemplateFormOpen}
                applyTemplate={applyTemplate}
              />
            ))}
            <button onClick={() => setFormOpen(!formOpen)}>
              Create Template
            </button>
            {formOpen && (
              <div className="Form">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <input type="text" placeholder="summary" name="summary" ref={register({ maxLength: 80 })} />
                  <input type="text" placeholder="description" name="description" ref={register({ maxLength: 100 })} />
                  <input type="time" name="starttime" ref={register({ required: true })} />
                  <input type="time" name="endtime" ref={register({ required: true })} />

                  <input type="submit" />
                </form>
              </div>
            )}
          </div>
        </div>
        <div className="right">
          <img src={Logo} alt="logo" className="logo" />
          <Calendar
            events={events}
            data={data}
            templateFormOpen={templateFormOpen}
            setTemplateFormOpen={setTemplateFormOpen}
            selected={selected}
            setSelected={setSelected}
            date={date}
            setDate={setDate}
          />
        </div>
      </main>
    </div>
  );
};

export default Home;
