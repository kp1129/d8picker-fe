import React from 'react';

import NavBarHome from './NavbarHome';
import Sidebar from './Sidebar';
import { Container, Paper, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	container: {
		// width: '100%',
		background: '#2a303d',
		height: '100vh'
	},
	sidebar: {
		border: '1px solid #fcfcac'
	},
	calendar: {
		border: '1px solid #fcfcac'
	}
}));

const Home = () => {
	const classes = useStyles();
	return (
		<div>
			<Container className={classes.container}>
				<NavBarHome />
				<Typography variant='h3'>Home</Typography>

				<Paper className={classes.sidebar}>
					<Sidebar />
				</Paper>
				<Paper className={classes.calendar}></Paper>
			</Container>
		</div>
	);
};

export default Home;
