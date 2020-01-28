import React from 'react'
import CreateEventModal from './createEventModal'
import {makeStyles} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
nav: {
    width: '100%',
    background: '#fcfcac',
    padding: 5
}
}))

function NavbarHome() {
    const classes = useStyles();
    return (
        <div className={classes.nav}>
            <CreateEventModal />
        </div>
    )
}

export default NavbarHome

