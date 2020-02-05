import React from 'react';
import '../../styling/Sidebar.css';
import { Link } from '@reach/router';

/*
Recommended Styling
1. Set a z-index having value >1
2. Set overflow-x and y to hidden
*/

function Sidebar() {
  return (
    <div className="container">
      <input data-function="swipe" id="swipe" type="checkbox" />
      <label data-function="swipe" htmlFor="swipe">
        <span className="close" />
      </label>
      <label data-function="swipe" htmlFor="swipe">
        <span className="hamburger" />
      </label>
      <div className="sidebar">
        <br />
        <br />
        <nav className="menu">
          <img className="img1" src="black1.png" alt="MUN" />
          <br />
          <li>
            <Link to="/executiveBoard">Dashboard</Link>
          </li>
          <li>
            <Link to="/ebPoll">Create Poll</Link>
          </li>
          <li>
            <Link to="/result">View Results</Link>
          </li>
          <li>
            <a href="https://vitcmun.in/">Logout</a>
          </li>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
