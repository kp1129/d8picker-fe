import React from 'react';

import axios from 'axios';

import {
	makeStyles,
	Modal,
	TextField,
	Typography,
	Button
} from '@material-ui/core';

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
function createEventModal() {
	const classes = useStyles();

	const [event, setEvent] = useState({
		title: ''
	});

	// getModalStyle is not a pure function, we roll the style only on the first render
	const [modalStyle] = useState(getModalStyle);
	const [open, setOpen] = useState(false);

	const handleChanges = e => {
		setEvent({ ...event, [e.target.name]: e.target.value });
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
				Create Event
			</button>
			{/* Modal drops down register form */}
			<Modal
				aria-labelledby='simple-modal-title'
				aria-describedby='simple-modal-description'
				open={open}
				onClose={handleClose}
			>
				<div style={modalStyle} className={classes.paper}>
					<Typography>Create Event</Typography>
					<form onSubmit={handleSubmit} className={classes.form}>
						<TextField
							id='outlined-basic'
							label='title'
							name='title'
							margin='normal'
							variant='outlined'
							value={user.title}
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

export default createEventModal;
