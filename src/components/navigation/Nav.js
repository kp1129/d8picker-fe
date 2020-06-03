import React, { useState } from 'react';
import styled from 'styled-components';
import Hamburger from './Hamburger/TopNav.js';
import AddEventButton from '../events/AddEventButton.js';
import calendarBtnInactive from '../navigation/NavImgs/Calendar Button-Inactive.png';
import calendarBtnActive from '../navigation/NavImgs/Calendar Button-Active.png';
import settingsBtnActive from '../navigation/NavImgs/Settings Button-Active.png';
import settingsBtnInactive from '../navigation/NavImgs/Settings Button-Inactive.png';
import groupsBtnInactive from '../navigation/NavImgs/Group Button-Inactive.png';
import groupsBtnActive from '../navigation/NavImgs/Group Button-Active.png';
import eventsBtnInactive from '../navigation/NavImgs/Events Button-Inactive.png';
import eventsBtnActive from '../navigation/NavImgs/Events Button-Active.png';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import TemplateContainer from '../events/TemplateContainer';

const Nav = ({
  setNavState,
  colors,
  setFormOpen,
  setSelected,
  setToggleNav,
  setTemplateFormOpen
}) => {  
  // this controls how to display the arrows (up or down) and
  // whether or not to display the pop-out divs in desktop view
  const [isDisplayingEvents, setIsDisplayingEvents] = useState(false);
  const [isDisplayingGroups, setIsDisplayingGroups] = useState(false);
  const [isDisplayingCalendar, setIsDisplayingCalendar] = useState(false);
  const [isDisplayingSettings, setIsDisplayingSettings] = useState(false);
  // this allows the app to display components either in
  // desktop or mobile view, depending on user viewport
  const { height, width } = useWindowDimensions();

// handles behavior of the Calendar tab
  const handleCalendar = () => {
    // controls how the tab behaves in desktop view
    if (width >= 768) {
      // toggle
      // arrows and pop-out div depend on this state
      setIsDisplayingCalendar(!isDisplayingCalendar);
      // set the view to the right of the sidebar
      setNavState(0);
    // controls how the tab behaves in mobile view
    } else {
      // no toggle
      setIsDisplayingCalendar(false);
      // set the view on the page
      setNavState(0);
    }
  };

  // handles behavior of the Events tab
  const handleEvents = () => {
    // controls how the tab behaves in desktop view
    if (width >= 768) {
      // toggle
      // arrows and pop-out div depend on this state
      setIsDisplayingEvents(!isDisplayingEvents);
      // set the view to the right of the sidebar
      setNavState(0);
    // controls how the tab behaves in mobile view  
    } else {
      // no toggle
      setIsDisplayingEvents(false);
      // set the view on the page
      setNavState(1);
    }
  };

  // handles behavior of the Groups tab
  const handleGroups = () => {
    // controls how the tab behaves in desktop view
    if (width >= 768) {
      // toggle
      // arrows and pop-out div depend on this state
      setIsDisplayingGroups(!isDisplayingGroups);
      // set the view to the right of the sidebar
      setNavState(0);
    // controls how the tab behaves in mobile view
    } else {
      // no toggle
      setIsDisplayingGroups(false);
      // set the view on the page
      setNavState(2);
    }
  };

  // handles behavior of the Settings tab
  const handleSettings = () => {
      setIsDisplayingSettings(!isDisplayingSettings);
  };

  //icon and label colors change based on navState
  return (
    <Container>
      <NavContainer>
        {/* calendar tab */}
        <IconDiv className="calendarIcon" onClick={handleCalendar}>
          <div className="popout-div">
            <Img src={isDisplayingCalendar ? calendarBtnActive : calendarBtnInactive} />
            <Label style={{ color: colors[2] }}>Calendar</Label>
            <Arrow
              className={
                isDisplayingCalendar
                  ? 'fas fa-chevron-up'
                  : 'fas fa-chevron-down'
              }
            ></Arrow>
          </div>
          {isDisplayingCalendar && (
            <CalendarPlaceholder>calendar placeholder</CalendarPlaceholder>
          )}
        </IconDiv>
        {/* events tab */}
        <IconDiv className="eventsIcon" onClick={handleEvents}>
          <div className="popout-div">
            <Img
              src={isDisplayingEvents ? eventsBtnActive : eventsBtnInactive}
              style={{ fontSize: '2rem', color: colors[0] }}
            />
            <Label style={{ color: colors[1] }}>Events</Label>
            <Arrow
              className={
                isDisplayingEvents ? 'fas fa-chevron-up' : 'fas fa-chevron-down'
              }
            ></Arrow>
          </div>
          {isDisplayingEvents && (
            <EventsPlaceholder>
              <TemplateContainer />
            </EventsPlaceholder>
          )}
        </IconDiv>
        {/* groups tab */}
        <IconDiv className="groupIcon" onClick={handleGroups}>
          <div className="popout-div">
            <Img
              src={isDisplayingGroups ? groupsBtnActive : groupsBtnInactive}
              style={{ fontSize: '2rem', color: colors[0] }}
            />
            <Label style={{ color: colors[2] }}>Groups</Label>
            <Arrow
              className={
                isDisplayingGroups ? 'fas fa-chevron-up' : 'fas fa-chevron-down'
              }
            ></Arrow>
          </div>
          {isDisplayingGroups && (
            <GroupPlaceholder>groups placeholder</GroupPlaceholder>
          )}
        </IconDiv>
        {/* settings tab */}
        <IconDiv className="settingsIcon" onClick={handleSettings}>
          <div className="popout-div">
            <Img src={isDisplayingSettings ? settingsBtnActive : settingsBtnInactive} />

            <Label style={{ color: colors[2] }}>Settings</Label>
            <Arrow
              className={
                isDisplayingSettings
                  ? 'fas fa-chevron-up'
                  : 'fas fa-chevron-down'
              }
            ></Arrow>
          </div>
        </IconDiv>
        <IconDiv className={isDisplayingEvents ? 'addEventIcon' : 'eventBtn'}>
          <AddEventButton />
          <Label style={{ color: colors[2], marginTop: '6px' }}>
            Add Event
          </Label>
        </IconDiv>
      </NavContainer>
      {isDisplayingSettings && <Hamburger />}
    </Container>
  );
};

// styled components
const size = {
  tablet: '768px',
  desktop: '1024px'
};
const device = {
  desktop: `(min-width: ${size.desktop})`
};

const CalendarPlaceholder = styled.div`
  width: 90%;
  border: 1px solid gray;
`;

const EventsPlaceholder = styled.div`
  width: 100%;
  border: 1px solid gray;
`;

const GroupPlaceholder = styled.div`
  width: 90%;
  border: 1px solid gray;
`;

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
    justify-content: flex-start;

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
    position: static;
    z-index: 100;
    border-top: 1px solid #f2f2f2;
    background: white;
    width: 25%;
    height: 100%;
    left: 0;

    .eventsIcon {
      order: 1;
    }
    .groupIcon {
      order: 3;
    }
    .calendarIcon {
      order: 4;
    }
    .settingsIcon {
      order: 5;
    }
    .addEventIcon {
      order: 2;
    }
  }
`;
const IconDiv = styled.div`
  width: fit-content;
  // height: 55px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }

  @media ${device.desktop} {
    flex-direction: column;
    justify-content: space-around;
    margin-bottom: 8%;

    .popout-div {
      display: flex;
      align-items: center;
      margin-bottom: 3%;
    }

    .addEventText {
      margin-left: 20px;
    }
    .groupsText {
      padding: ;
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
    margin-left: 30%;
  }
`;
export default Nav;
