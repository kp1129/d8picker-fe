import React, { useState } from 'react';

import axios from 'axios';

import Modal from './Modal'

import { TextField, Button, makeStyles } from '@material-ui/core';

import '../App.css';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1
	},
	form: {
		display: 'flex',
        width: '60%'
	},
	input: {
		background: 'white',
		margin: 5,
		borderRadius: 5
	},
	button: {
		background: '#caad0fd4',
        fontSize: '1rem',
        padding: 10
    },

}));

function Login() {
	const classes = useStyles();

	const [user, setUser] = useState({
		username: '',
		password: ''
	});

	const handleChanges = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
        console.log('handleChanges Login', user)
	};

	const handleSubmit = e => {
        console.log('handleSubmit Login', user)
		e.preventDefault();
		console.log(user);
		axios
			.post('', user)
			.then(res => {
				console.log('Post', res);
			})
			.catch(err => {
				console.log(err);
			});
		setUser({ username: '', password: '' });
	};

	return (
		
			<div className='navbar' >
			<Modal />
				<form onSubmit={handleSubmit} className={classes.form}>
					<TextField
						id='outlined-basic'
						label='username'
						name='username'
						margin='normal'
						variant='outlined'
						value={user.username}
						onChange={handleChanges}
						className={classes.input}
						required
					/>
					<TextField
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
