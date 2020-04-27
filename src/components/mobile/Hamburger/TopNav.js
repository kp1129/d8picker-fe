import React, {useState, useEffect} from 'react'
import "./TopNav.css"
import {Image} from '@chakra-ui/core';

import { useAuth } from '../../../contexts/auth';
import styled from "styled-components"


const Hamburger = () => {
  const { googleApi } = useAuth();
  const { currentUser, handleSignOut } = googleApi;

  const [img, setImg] = useState(currentUser.photoUrl);

  useEffect(()=>{
    setImg(currentUser.photoUrl)
  },[])

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
     
      <input type="checkbox" className="blue" id="menu"/>
      
        <label htmlFor="menu" className="icon">
        
          <div className="menu"></div>
        </label>
       
        <nav className = "burger-container">
        <Image
              rounded="full"
              size="45px"
              src={img}
              alt="avatar"
              // mb={2}
              style={{marginTop: window.innerHeight*-.068, marginLeft: "2%", marginBottom: "2%"}}
            />
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