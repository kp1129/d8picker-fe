import React from "react";

const Nav = () => {
    return (
        <div style={{ height: '100vh' }}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #000000', paddingTop: '5%', paddingBottom: '2.5%', paddingLeft: '2.5%', paddingRight: '2.5%' }}>
                <i class="fas fa-bars" style={{ height: '34px', width: '80px', fontSize: '1.6rem' }}></i>
                <button style={{ height: '34px', width: '97px', color: 'white', background: '#28807D', fontFamily: 'Open Sans', fontWeight: 'bold', borderRadius: '10px', padding: 'auto auto' }}>Add event</button>
            </div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', position: 'fixed', bottom: '0', padding: '3% 2.5%', borderTop: '1px solid #F2F2F2' }}>
                <div style={{ width: '61px', height: '55px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <i class="far fa-calendar-alt" style={{ fontSize: '1.5rem', color: '#BDBDBD' }}></i>
                    <p style={{ fontSize: '10px', color: '#BDBDBD', fontFamily: 'Open Sans' }}>Calendar</p>
                </div>

                <div style={{ width: '61px', height: '55px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <i class="fas fa-bars" style={{ fontSize: '1.5rem', color: '#BDBDBD' }}></i>
                    <p style={{ fontSize: '10px', color: '#BDBDBD', fontFamily: 'Open Sans' }}>Events</p>
                </div>

                <div style={{ width: '61px', height: '55px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <i class="fas fa-users" style={{ fontSize: '1.5rem', color: '#BDBDBD' }}></i>
                    <p style={{ fontSize: '10px', color: '#BDBDBD', fontFamily: 'Open Sans' }}>Groups</p>
                </div>
            </div>
        </div>
    )
}

export default Nav;