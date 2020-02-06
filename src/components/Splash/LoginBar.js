import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';

import axios from 'axios';


import { TextField, Button, makeStyles } from '@material-ui/core';

import '../../App.css';

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



	return (
		<div className='navbar'>
<button>OAuth</button>
		</div>
	);
}

export default Login;
