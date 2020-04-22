import React from 'react'
import "./TopNav.css"

const Hamburger = () => {

  return (
    <div>
      <input type="checkbox" class="blue" id="menu"/>
        <label for="menu" class="icon">
          <div class="menu"></div>
        </label>

        <nav>
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