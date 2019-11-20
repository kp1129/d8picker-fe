/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { AuthContext } from "../../contexts/auth/authState"

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

    // const eventsDbRef = db
    //     .collection("calendars")
    //     .doc("hURNrIybLCJE0dJ9GqKM")
    //     .collection("events");
    //keep in state first calendar as default, have dropdown select for individual calendars

    useEffect(() => {
        // eventsDbRef
        //     .get()
        //     .then(snapshot => {
        //         snapshot.docs.map(doc => console.log(doc.id))
        //         setevent(snapshot.docs.map(doc => doc.data()))
        //     })
        //     .catch(err=> console.log('something is up', err))
    },[])


    const doDelete = id => {
        console.log('delete')
        setEvent(event.filter(event => event.id !== id))
    }
    return (

        <div className='event-display-container'>
            <h1>Events Go HERE</h1>
            <div style={{display:'flex', margin:"2%"}}>
                {data.map(info => { return (
                    <Card className={classes.card} style={{width:"20%", margin:"2%"}}>
                    <CardContent>
                      <Typography gutterBottom>
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
hello
                  </Card>
                  
                )}

                )}
            </div>

        </div>
    )
}

export default EventDisplay;