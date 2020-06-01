import React, { useState } from 'react';
import styled from 'styled-components';
import Hamburger from './Hamburger/TopNav.js';
import AddEventButton from '../events/AddEventButton.js';
import calendarBtnInactive from '../navigation/NavImgs/Calendar Button-Inactive.png';
import settingsBtnActive from '../navigation/NavImgs/Settings Button-Active.png';
import settingsBtnInactive from '../navigation/NavImgs/Settings Button-Inactive.png';
import groupsBtnInactive from '../navigation/NavImgs/Group Button-Inactive.png';
import eventsBtnInactive from '../navigation/NavImgs/Events Button-Inactive.png';

const Nav = ({
  setNavState,
  colors,
  setFormOpen,
  setSelected,
  setToggleNav,
  setTemplateFormOpen
}) => {
  const [navToggle, setNavToggle] = useState(false);
  const [visible, setVisible] = useState(false);
    // this controls the add event icon 
  const [hidden, setHidden] = useState(true);
   // this controls the arrow toggles in desktop
  const [calendarIcon, setCalendarIcon] = useState(false);
  const [eventsIcon, setEventsIcon] = useState(false);
  const [groupsIcon, setGroupsIcon] = useState(false);
  const [settingsIcon, setSettingsIcon] = useState(false);

  const [isDisplayingEvents, setIsDisplayingEvents] = useState(false);
  const [isDisplayingGroups, setIsDisplayingGroups] = useState(false);
  const [isDisplayingCalendar, setIsDisplayingCalendar] = useState(false);
  const [isDisplayingSettings, setIsDisplayingSettings] = useState(false);


  //closes date selection more when a navigation to a new page, and empties date selection
  const handleChange = num => {
    setNavState(num);
    setFormOpen(false);
    setTemplateFormOpen(false);
    setSelected([]);
    setToggleNav(true);
    setHidden(false);
  };

    const handleCalendar = () => {
        setIsDisplayingCalendar(!isDisplayingCalendar);
    };
    const handleEvents = () => {
        setIsDisplayingEvents(!isDisplayingEvents);
    };
    const handleGroups = () => {
      setIsDisplayingGroups(!isDisplayingGroups);
    };
    const handleSettings = () => {
      setIsDisplayingSettings(!isDisplayingSettings);
    };


  //icon and label colors change based on navState
  return (
    <Container>
      <NavContainer>
        <IconDiv className='calendarIcon' onClick={handleCalendar}>
          <Img src={calendarBtnInactive} />
          <Label style={{ color: colors[2] }}>Calendar</Label>
          <Arrow className={isDisplayingCalendar ? "fas fa-chevron-down" : "fas fa-chevron-up"}></Arrow>
        </IconDiv>
        <IconDiv className='eventsIcon' onClick={handleEvents}>
          <Img src={eventsBtnInactive} style={{ fontSize: '2rem', color: colors[0] }} />
          <Label style={{ color: colors[1] }}>Events</Label>
          <Arrow className={isDisplayingEvents ? "fas fa-chevron-down" : "fas fa-chevron-up"}></Arrow>
        </IconDiv>
        <IconDiv className='groupIcon' onClick={handleGroups}>
            <Img src={groupsBtnInactive} style={{ fontSize: '2rem', color: colors[0] }} />
          <Label style={{ color: colors[2] }}>Groups</Label>
          <Arrow className={isDisplayingGroups ? "fas fa-chevron-down" : "fas fa-chevron-up"}></Arrow>
        </IconDiv>
        <IconDiv className='settingsIcon' onClick={handleSettings}>
            <Img src={settingsBtnInactive} />

          <Label style={{ color: colors[2] }}>Settings</Label>
          <Arrow className={isDisplayingSettings ? "fas fa-chevron-down" : "fas fa-chevron-up"}></Arrow>
        </IconDiv>
        <IconDiv className={isDisplayingEvents ? "addEventIcon" : "eventBtn"}>
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

        .eventBtn {
            display: none !important;
        }
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
        width: 18%;
        height: 100%;
        left: 0;

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

            .addEventText {
                margin-left: 20px;
            }
            .groupsText {
                padding: 
            }
            
    }
`;
const Label = styled.p`
  font-size: 14px;
  font-family: Open Sans;
  color: gray;
    
    @media ${device.desktop} {
        font-size: 18px;
    }
`;

const Img = styled.img`
margin-bottom: 10px;

    @media ${device.desktop} {
        margin-right: 20px;
    }
`;

const Arrow = styled.i`
    display: none;

    @media ${device.desktop} {
        display: block !important;
        color: gray;
        font-size: 1.4rem;
        margin-left: 85%;
    }

`
export default Nav;
