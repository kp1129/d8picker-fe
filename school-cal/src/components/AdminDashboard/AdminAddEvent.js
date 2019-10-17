import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function AdminAddEvent() {

    return (
            <div className = "AdminAddEvent-container">
                <h1>this is where we are going to add an event </h1>
                <Link to ='AdminDashboard'>
                    <p>Confirm</p>
                </Link>
            </div>

    )
};

export default AdminAddEvent; 