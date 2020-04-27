import React from 'react'
import "./TopNav.css"
import { useAuth } from '../../../contexts/auth';
import styled from "styled-components"


const Hamburger = () => {
  const { googleApi } = useAuth();
  const { currentUser, handleSignOut } = googleApi;

  const ProfileImg = styled.img`
  border-radius: 50%;
  height: 40px;
  width: 40px;
  position: fixed;
  margin: 2.5% 0% 0% 2.5%;
  z-index: 201;
  `

  return (
    <div>
      <input type="checkbox" className="blue" id="menu" />
      <ProfileImg src={currentUser.photoUrl} alt="avatar"/>
      <label htmlFor="menu" className="icon">
        <div className="menu"></div>
      </label>

      <nav className="burger-container">

        <ul>
          <li onClick={() => {
            handleSignOut();
            window.location.reload();
            console.log("sign out")
          }}>
            <a href="#">Sign Out</a>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Hamburger;