import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import axios from 'axios';

// Pull in Modal component (register form)
import RegisterModal from './RegisterModal';

import { TextField, Button, makeStyles } from '@material-ui/core';

import '../App.css';

// Styling for material-ui
const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1
	},
	form: {
		display: 'flex',
		margin: '0 3%'
	},
	input: {
		background: 'white',
		margin: 5,
		borderRadius: 5
	},
	button: {
		background: '#caad0fd4',
		fontSize: '.8rem',
		padding: 10,
		width: '10%'
	}
}));

function Login() {
	const classes = useStyles();
	const history = useHistory();
	const [user, setUser] = useState({
		email: '',
		password: ''
	});

	const handleChanges = e => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const handleSubmit = e => {
		e.preventDefault();
		console.log('Login', user);
		axios
			.post('https://d8picker.herokuapp.com/api/user/login', user)
			.then(res => {
				console.log('Post', res);
				localStorage.setItem('token', res.data.token);
				history.push('/home');
			})
			.catch(err => {
				console.log(err);
			});
		setUser({ email: '', password: '' });
	};

	return (
		<div className='navbar'>
			<RegisterModal />
			<form onSubmit={handleSubmit} className={classes.form}>
				<TextField
					type='email'
					id='outlined-basic'
					label='email'
					name='email'
					margin='normal'
					variant='outlined'
					value={user.email}
					onChange={handleChanges}
					className={classes.input}
					required
				/>
				<TextField
					type='password'
					id='outlined-basic'
					label='password'
					name='password'
					margin='normal'
					variant='outlined'
					value={user.password}
					onChange={handleChanges}
					className={classes.input}
					required
				/>
				<Button type='submit' className={classes.button}>
					sign in
				</Button>
			</form>
		</div>
	);
}

export default Login;
