import React, {useState, useEffect} from 'react';
import Calendar from './Calendar/Calendar';
import Sidebar from './Sidebar';
// import GoogleFormConnect from './GoogleFormConnect';

import NavBar from './Navbar';

import '../../App.css';
// import AddEventForm from './AddEventForm'

// const style = {
// 	border: 0,
// 	width: '900px',
// 	height: '75vh',
// 	frameborder: '0',
// 	scrolling: 'no'
// };

const Home = () => {
	// const [email, setEmail] = useState('')


	// useEffect(() => { setEmail('funnyusernamego') }, []);

	// const cal = `https://calendar.google.com/calendar/embed?src=${email}%40gmail.com&ctz=America%2FLos_Angeles`
  
	// 	const [cal, setCal] = useState(
	// 		'https://calendar.google.com/calendar/embed?src=funnyusernamego%40gmail.com&ctz=America%2FLos_Angeles'
	// 	);

	// 	useEffect(() => {
	// 		setCal(
	// 			'https://calendar.google.com/calendar/embed?src=funnyusernamego%40gmail.com&ctz=America%2FLos_Angeles'
	// 		);
	//   }, []);

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
			{/* <GoogleFormConnect /> */}
			{/* <AddEventForm /> */}
			{/* <iframe src={cal} style={style}></iframe> */}
		</div>
	);
};

export default Home;
