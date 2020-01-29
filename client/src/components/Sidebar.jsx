/* eslint-disable jsx-a11y/label-has-associated-control */
/*
Since two labels are being used for a single input so disable the
corresponding eslint error
*/
import React from 'react';
import '../styling/Sidebar.css';

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
            <a href="https://vitcmun.in/">Home</a>
          </li>
          <li>
            <a href="https://vitcmun.in/">XYZ</a>
          </li>
          <li>
            <a href="https://vitcmun.in/">XYZ</a>
          </li>
          <li>
            <a href="https://vitcmun.in/">XYZ</a>
          </li>
          <li>
            <a href="https://vitcmun.in/">XYZ</a>
          </li>
          <li>
            <a href="https://vitcmun.in/">XYZ</a>
          </li>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
