import React, { useState, useEffect } from 'react';
import Calendar from './Calendar/Calendar';

import axios from 'axios';

import '../../App.css';

const Home = () => {
	const [data, setData] = useState({});
	const [events, setEvents] = useState([]);

	useEffect(() => {
		(async () => {
			const res = await axios.get(process.env.EVENTS_URL);
			const results = await res.data;
			localStorage.setItem('googleId:', res.data.googleId);
			console.log('results: ', results);
			setData(results);
			setEvents(results.events);
			// setLoading(true);
		})();
	}, [setEvents]);

	return (
		<div>
			<header>
				<div id='logo'>
					<span className='icon'>D8Picker Calendar</span>
				</div>
			</header>
			<main>
				<Calendar events={events} data={data}/>
			</main>
		</div>
	);
};

export default Home;
