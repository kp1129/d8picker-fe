import React, {useState, useEffect} from "react";
import styled from 'styled-components'


const Nav = ({setNavState, colors}) => {



    if (props.NavState === 0) {
        return (
            <div>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', position: 'fixed', bottom: '0', padding: '3% 2.5%', borderTop: '1px solid #F2F2F2', background: 'white' }}>
                    <div onClick={handleCalendar} style={{ width: '61px', height: '55px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <i className="far fa-calendar-alt" style={{ fontSize: '1.5rem', color: '#BDBDBD' }}></i>
                        <p style={{ fontSize: '10px', color: '#BDBDBD', fontFamily: 'Open Sans' }}>Calendar</p>
                    </div>
    
                    <div onClick={handleEvents} style={{ width: '61px', height: '55px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <i className="fas fa-bars" style={{ fontSize: '1.5rem', color: '#BDBDBD' }}></i>
                        <p style={{ fontSize: '10px', color: '#BDBDBD', fontFamily: 'Open Sans' }}>Events</p>
                    </div>
    
                    <div onClick={handleGroups} style={{ width: '61px', height: '55px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <i className="fas fa-users" style={{ fontSize: '1.5rem', color: '#BDBDBD' }}></i>
                        <p style={{ fontSize: '10px', color: '#BDBDBD', fontFamily: 'Open Sans' }}>Groups</p>
                    </div>
                </div>
            </div>
        )
    } else if (props.NavState === 1) {
        return (
            <div>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #000000', paddingTop: '5%', paddingBottom: '2.5%', paddingLeft: '2.5%', paddingRight: '2.5%', position: 'fixed', top: '0', background: 'white' }}>
                    <i className="fas fa-bars" style={{ height: '34px', width: '80px', fontSize: '1.6rem' }}></i>
                    <button style={{ height: '34px', width: '97px', color: 'white', background: '#28807D', fontFamily: 'Open Sans', fontWeight: 'bold', borderRadius: '10px', padding: 'auto auto' }}>Add event</button>
                </div>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', position: 'fixed', bottom: '0', padding: '3% 2.5%', borderTop: '1px solid #F2F2F2', background: 'white' }}>
                    <div onClick={handleCalendar} style={{ width: '61px', height: '55px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <i className="far fa-calendar-alt" style={{ fontSize: '1.5rem', color: '#BDBDBD' }}></i>
                        <p style={{ fontSize: '10px', color: '#BDBDBD', fontFamily: 'Open Sans' }}>Calendar</p>
                    </div>
    
                    <div onClick={handleEvents} style={{ width: '61px', height: '55px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <i className="fas fa-bars" style={{ fontSize: '1.5rem', color: '#BDBDBD' }}></i>
                        <p style={{ fontSize: '10px', color: '#BDBDBD', fontFamily: 'Open Sans' }}>Events</p>
                    </div>
    
                    <div onClick={handleGroups} style={{ width: '61px', height: '55px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <i className="fas fa-users" style={{ fontSize: '1.5rem', color: '#BDBDBD' }}></i>
                        <p style={{ fontSize: '10px', color: '#BDBDBD', fontFamily: 'Open Sans' }}>Groups</p>
                    </div>
                </div>
            </div>
        )
    } else if (props.NavState === 2) {
        return (
            <div style={{ height: '100vh' }}>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', position: 'fixed', bottom: '0', padding: '3% 2.5%', borderTop: '1px solid #F2F2F2', background: 'white' }}>
                    <div onClick={handleCalendar} style={{ width: '61px', height: '55px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <i className="far fa-calendar-alt" style={{ fontSize: '1.5rem', color: '#BDBDBD' }}></i>
                        <p style={{ fontSize: '10px', color: '#BDBDBD', fontFamily: 'Open Sans' }}>Calendar</p>
                    </div>

    
                    <IconDiv onClick={()=>handleChange(1)}>
                        <i className="fas fa-bars" style={{ fontSize: '1.5rem', color: colors[1]  }}></i>
                        <Label style={{color: colors[1]}}>Events</Label>
                    </IconDiv>
    
                    <IconDiv onClick={()=>handleChange(2)}>
                        <i className="fas fa-users" style={{ fontSize: '1.5rem', color: colors[2]  }}></i>
                        <Label style={{color: colors[2]}}>Groups</Label>
                    </IconDiv>
                </Container>
            </div>)

          
}

const Container = styled.div`

    width: 100%; 
    display: flex;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    padding: 3% 2.5%;
    border-top: 1px solid #F2F2F2;
    background: white;

`;

const IconDiv = styled.div`
    width: 61px;
    height: 55px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Label = styled.p`
    font-size: 10px;
    font-family: Open Sans;
`;

export default Nav;