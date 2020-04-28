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



  return (
    <div>
     
      <input type="checkbox" className="blue" id="menu"/>
      
        <Label htmlFor="menu" className="icon">
        
          <div className="menu"></div>
        </Label>
       
        <nav className = "burger-container">
        <Image
              rounded="full"
              size="45px"
              src={img}
              alt="avatar"
              style={{position: 'fixed', marginTop: '-50px', marginLeft: "15px", marginBottom: "20px"}}
            />
          <ul >
            <li onClick={() => {
              handleSignOut();
              window.location.reload();
              console.log("sign out")
            }}>
              <SignOut href="#">Sign Out</SignOut>
            </li>
          </ul>
        </nav>
    </div>
  )
}

export default Hamburger;

const SignOut = styled.a`
  background: #FC8181;
  padding: 2%;
  border-radius: 5px;
  color: white;
`;

//stops checkbox highlighting blue when triggered
const Label = styled.label`
-webkit-tap-highlight-color: rgba(0,0,0,0) !important;
`;