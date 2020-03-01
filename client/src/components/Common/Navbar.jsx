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

  const usertype = localStorage.getItem('userType');

  const getGreeting = () => {
    if (usertype === '0') {
      const username = localStorage.getItem('userName');
      return (
        <div className="welcome">
          <p className="welcome welcometext">{`Welcome ${username}`}</p>
        </div>
      );
    }
    return (
      <div className="welcome">
        <img src="Logos/Square/Arab-01.png" className="small" alt="Username" />
      </div>
    );
  };

  const getRender = () => {
    if (usertype === '0') {
      return (
        <div className="nav-container">
          <img className="logo" src="Logos/mun.png" alt="MUN Logo" />
          <div className="navigation">
            <ul>
              <li>{getGreeting()}</li>{' '}
              <li>
                <a onClick={logout} id="secondLink" href="#">
                  Logout{' '}
                </a>{' '}
              </li>{' '}
            </ul>{' '}
          </div>{' '}
        </div>
      );
    }
    return (
      <div className="nav-container">
        <img
          onClick={gotoDashboard}
          className="logo"
          src="Logos/mun.png"
          onKeyPress={gotoDashboard}
          alt="MUN Logo"
        />
        <div className="navigation">
          <ul>
            <li>{getGreeting()}</li>{' '}
            <li>
              <a onClick={gotoDashboard} href="#">
                Dashboard{' '}
              </a>{' '}
            </li>{' '}
            <li>
              <a onClick={logout} id="secondLink" href="#">
                Logout{' '}
              </a>{' '}
            </li>{' '}
          </ul>{' '}
        </div>{' '}
      </div>
    );
  };

  return getRender();
};

export default Navbar;
