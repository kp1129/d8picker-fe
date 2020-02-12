import React, {useState, useEffect} from 'react';
import Calendar from './Calendar/Calendar';

import '../../App.css';

const Home = () => {
	useEffect(() => {
		(async () => {
			const res = await axios.get('/api/events');
			const results = await res.data;
			localStorage.setItem('googleId:', res.data.googleId);
      console.log('results: ', results);
      setData(results)
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
				<Calendar />
			</main>
			
		</div>
	);
};

export default Home;
