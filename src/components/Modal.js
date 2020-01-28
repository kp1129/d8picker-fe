import React, { useState } from 'react';

import axios from 'axios'
import { makeStyles, Modal, TextField, Typography, Button } from '@material-ui/core';

// modal logic
function rand() {
	return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
	const top = 50 + rand();
	const left = 50 + rand();

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`
	};
}

// material-ui styles
const useStyles = makeStyles(theme => ({
	paper: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
		width: 200,
		backgroundColor: theme.palette.background.paper,
		border: '10px solid #cbaa0d',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3)
  },
  button: {
    background: '#cbaa0d'
  },
  mButton: {
    background: '#2a303d',
    fontSize: '1.3rem',
    padding: 10,
    border: '1px solid #caad0fd4',
    color: '#caad0fd4',
    borderRadius: 10
  }
}));

export default function SimpleModal() {
	const classes = useStyles();
	
	const [user, setUser] = useState({
    name: '',
		email: '',
		password: ''
  });

  // getModalStyle is not a pure function, we roll the style only on the first render
	const [modalStyle] = useState(getModalStyle);
	const [open, setOpen] = useState(false);

  const handleChanges = e => {
		setUser({ ...user, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = e => {
		e.preventDefault();
		console.log('register',user);
		axios
			.post('https://d8picker.herokuapp.com/api/user/register', user)
			.then(res => {
        console.log('Post', res);
        localStorage.setItem('token', res.data.token)
			})
			.catch(err => {
				console.log(err);
			});
		setUser({ name: '', email: '', password: '' });
  };
  
	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<button type='button' onClick={handleOpen} className={classes.mButton}>
				Register
			</button>
      {/* Modal drops down register form */}
			<Modal
				aria-labelledby='simple-modal-title'
				aria-describedby='simple-modal-description'
				open={open}
				onClose={handleClose}
			>
				<div style={modalStyle} className={classes.paper}>
					<Typography>Register</Typography>
					<form onSubmit={handleSubmit} className={classes.form}>
          <TextField
							id='outlined-basic'
							label='name'
							name='name'
							margin='normal'
							variant='outlined'
							value={user.name}
							onChange={handleChanges}
							className={classes.input}
							required
						/>
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
							submit
						</Button>
					</form>
				
				</div>
			</Modal>
		</div>
	);
}
