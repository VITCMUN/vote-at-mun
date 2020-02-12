/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import '../../styling/Navbar.css';
import { navigate } from '@reach/router';
import { useApolloClient } from '@apollo/react-hooks';

// Navbar will contain the MUN Logo on the left and Dashboard, Logout buttons on right
const Navbar = () => {
  const client = useApolloClient();
  const gotoDashboard = event => {
    event.preventDefault();
    navigate('./dashboard');
  };

  const logout = event => {
    event.preventDefault();
    client.writeData({
      data: {
        isLoggedIn: false,
      },
    });
    localStorage.clear();
  };

  return (
    <div className="nav-container">
      <img
        onClick={gotoDashboard}
        className="logo"
        src="img/mun.png"
        onKeyPress={gotoDashboard}
        alt="MUN Logo"
      />
      <div className="navigation">
        <ul>
          <li>
            <div className="welcome">
              <p className="username">Welcome</p>
              <img src="img/mun.png" className="small" alt="Username" />
            </div>
          </li>
          <li>
            <a onClick={gotoDashboard} href="#">
              Dashboard
            </a>
          </li>
          <li>
            <a onClick={logout} id="secondLink" href="#">
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
