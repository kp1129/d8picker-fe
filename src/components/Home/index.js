import React from 'react';
import Calendar from './Calendar/Calendar';

import NavBar from './Navbar';

import '../../App.css';


const Home = () => {
	

	return (
		<div>
			<NavBar />
			<Sidebar />
			<header>
				<div id='logo'>
					<span className='icon'>date_range</span>
					<span>
						react<b>calendar</b>
					</span>
				</div>
			</header>
			<main>
				<Calendar />
			</main>
			
		</div>
	);
};

export default Home;
