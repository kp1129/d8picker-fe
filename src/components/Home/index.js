import React, { useState, useEffect } from 'react';
import Calendar from './Calendar/Calendar';
import Logo from '../../img/d8picker.png';
import favicon from '../../img/white.png'

import axios from 'axios';

const Home = () => {
  const [data, setData] = useState({});
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const url =
      process.env.NODE_ENV === 'development'
        ? '/api/events'
        : `${process.env.REACT_APP_ENDPOINT_URL}/api/events`;
    (async () => {
      const res = await axios.get(url);
      // const res = await axios.get(
      //   `${process.env.REACT_APP_ENDPOINT_URL}/api/events`
      // );
      const results = await res.data;
      localStorage.setItem('googleId:', res.data.googleId);
      console.log('results: ', results);
      setData(results);
      setEvents(results.events);
      // setLoading(true);
    })();
  }, [setEvents]);

  return (
    <div className="home">
      <div className="navbar">
        <img src={favicon} alt='' className='favicon' />
        <h2>Sign Out</h2>
      </div>

      <main className="main">
        <div className="left">
          <div className="profile">
            <img src={data.photoUrl} alt="" />
            <h3>{data.name}</h3>
          </div>
          <div className="template">
            <h4>templates</h4>
          </div>
        </div>
        <div className="right">
         
            <img src={Logo} alt="logo" className="logo"/>
          
          
            <Calendar events={events} data={data} />
          
        </div>
      </main>
    </div>
  );
};

export default Home;
