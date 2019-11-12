/* eslint-disable */

import React, { useState, useEffect } from 'react';
import firebase, { db } from '../../config/firebase/index'
// import EventCard from './EventCard';
import './EventDisplay.css'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const EventDisplay = () => {
    const classes = useStyles();
    const [data, setData] = useState([]);

    const eventsDbRef = db
        .collection("calendars")
        .doc("hURNrIybLCJE0dJ9GqKM")
        .collection("events");
    //keep in state first calendar as default, have dropdown select for individual calendars

    useEffect(() => {
        eventsDbRef
            .get()
            .then(snapshot => {
                snapshot.docs.map(doc => console.log(doc.id))
                setData(snapshot.docs.map(doc => doc.data()))
            })
            .catch(err=> console.log('something is up', err))
    },[]) //have an empty array, do .map then push to empty array, set data to array

    // useEffect(() => {
    //     eventsDbRef
    //         .onSnapshot(
    //             // doc => {
    //             //     console.log('docs', doc)
    //             // },
    //             // err => {
    //             //     console.log('error', err)
    //             // }
    //         )
    // },[])

    const deleteEvent = () => {

    }

    return (

        <div className='event-display-container'>
            <h1>Events Go HERE</h1>
            <div style={{display:'flex', margin:"2%"}}>
                {data.map(info => { return (
                    <Card className={classes.card} style={{width:"20%", margin:"2%"}}>
                    <CardContent>
                      <Typography   gutterBottom>
                        Event: {info.name}
                      </Typography>
                      <Typography>
                       Location: {info.location}
                      </Typography>

                      <Typography variant="body2" component="p">
                        Description: {info.description}
                      </Typography>
                      <Typography variant="body2" component="p">
                        Time: {info.starts}
                      </Typography>
                    </CardContent>

                  </Card>
                )}

                )}
            </div>

        </div>
    )
}

export default EventDisplay;