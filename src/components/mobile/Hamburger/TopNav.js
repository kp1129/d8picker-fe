import React from 'react'
import "./TopNav.css"
import { useAuth } from '../../../contexts/auth';

const Hamburger = () => {
  const { googleApi} = useAuth();
  const { currentUser, handleSignOut } = googleApi;

  return (
    <div>
      <input type="checkbox" className="blue" id="menu"/>
        <label htmlFor="menu" className="icon">
          <div className="menu"></div>
        </label>

        <nav className = "burger-container">
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