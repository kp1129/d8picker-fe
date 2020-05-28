import React, { useState } from 'react';
import styled from 'styled-components';
import Hamburger from './Hamburger/TopNav.js';
import AddEventButton from '../events/AddEventButton.js';

const Nav = ({
  setNavState,
  colors,
  setFormOpen,
  setSelected,
  setToggleNav,
  setTemplateFormOpen
}) => {
  const [navToggle, setNavToggle] = useState(false);

  //closes date selection more when a navigation to a new page, and empties date selection
  const handleChange = num => {
    setNavState(num);
    setFormOpen(false);
    setTemplateFormOpen(false);
    setSelected([]);
    setToggleNav(true);
  };
  //icon and label colors change based on navState
  return (
    <Container>
      <NavContainer>
        <IconDiv className='calendarIcon'
          onClick={() => {
            setToggleNav(true);
            handleChange(0);
          }}
        >
          <i
            className="far fa-calendar-alt"
            style={{ fontSize: '2rem', color: colors[0] }}
          ></i>
          <Label style={{ color: colors[0] }}>Calendar</Label>
        </IconDiv>
        <IconDiv className='eventsIcon' onClick={() => handleChange(1)}>
          <i
            className="fas fa-bars"
            style={{ fontSize: '2rem', color: colors[1] }}
          ></i>
          <Label style={{ color: colors[1] }}>Events</Label>
        </IconDiv>
        <IconDiv className='groupIcon' onClick={() => handleChange(2)}>
          <i
            className="fas fa-users"
            style={{ fontSize: '2rem', color: colors[2] }}
          ></i>
          <Label style={{ color: colors[2] }}>Groups</Label>
        </IconDiv>
        <IconDiv className='settingsIcon' onClick={() => setNavToggle(!navToggle)}>
          <i
            className="fas fa-th"
            style={{ fontSize: '2rem', color: colors[2] }}
          ></i>
          <Label style={{ color: colors[2] }}>Settings</Label>
        </IconDiv>
        <IconDiv className='addEventIcon' onClick={() => setNavToggle(!navToggle)}>
          <AddEventButton />
          <Label style={{ color: colors[2], marginTop: '6px'}}>Add Event</Label>
        </IconDiv>
      </NavContainer>
      {navToggle === true && <Hamburger />}
    </Container>
  );
};

const size = {
    tablet: '768px',
    desktop: '1024px'
}
const device = {
    desktop: `(min-width: ${size.desktop})`
}

const NavContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 3% 2.5%;
  border-top: 1px solid #f2f2f2;
  background: white;

    @media ${device.desktop} {
        display: flex;
        flex-direction: column;
        align-items: center; 
        align-content: stretch;
        height: 80%;
        padding-top: 15vh;
    }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #f2f2f2;
  background: white;

    @media ${device.desktop} {
        position: fixed; 
        border-top: 1px solid #f2f2f2;
        background: white;
        width: 20%;
        height: 100%;
        left: 0;
        border: 2px solid red;

        .eventsIcon {
            order: 1 
        }
        .groupIcon {
            order: 3
        }
        .calendarIcon {
            order: 4
        }
        .settingsIcon {
            order: 5
        }
        .addEventIcon {
            order: 2
        }
    }
`;
const IconDiv = styled.div`
  width: 61px;
  height: 55px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

    @media ${device.desktop} {
        flex-direction: row;
        justify-content: space-around;
    }
`;
const Label = styled.p`
  font-size: 12px;
  font-family: Open Sans;
`;
export default Nav;
