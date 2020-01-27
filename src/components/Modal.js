import React, { useState } from 'react';
import { makeStyles, Modal, TextField, Typography } from '@material-ui/core';

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

const useStyles = makeStyles(theme => ({
	paper: {
		position: 'absolute',
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3)
	}
}));

export default function SimpleModal() {
	const classes = useStyles();
	
	const [user, setUser] = useState({
		username: '',
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
  
	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<button type='button' onClick={handleOpen}>
				Open Modal
			</button>
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
					{/* <SimpleModal /> */}
				</div>
			</Modal>
		</div>
	);
}
