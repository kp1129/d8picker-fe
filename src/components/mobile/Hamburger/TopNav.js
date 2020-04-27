import React from 'react'
import "./TopNav.css"

const Hamburger = () => {

  return (
    <div>
      <input type="checkbox" className="blue" id="menu"/>
        <label htmlFor="menu" className="icon">
          <div className="menu"></div>
        </label>

        <nav className = "burger-container">
          <ul>
            <li>
              <a href="#">Sign Out</a>
            </li>
          </ul>
        </nav>
    </div>
  )
}

export default Hamburger;