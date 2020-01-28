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
  center: {
    display: 'flex'
  },
	sidebar: {
    border: '1px solid #fcfcac',
    background: '#a6a6a6',
    margin: 5,
    width: '20%',
    height: '75vh',
	},
	calendar: {
    border: '1px solid #fcfcac',
    border: '1px solid #fcfcac',
    background: '#1a1a1a',
    color: 'white',
    margin: 5,
    width: '80%',
    height: '75vh',
	}
}));

const Home = () => {
	const classes = useStyles();
	return (
		<div>
			<Container className={classes.container}>
				<NavBarHome />
				
				<div className={classes.center} >
					<Paper className={classes.sidebar}>
          <Typography variant='h6'>Sidebar</Typography>
						<Sidebar />
					</Paper>
					<Paper className={classes.calendar}>
          <Typography variant='h6'>Calendar</Typography>
          </Paper>
				</div>
			</Container>
		</div>
	);
};

export default Home;
