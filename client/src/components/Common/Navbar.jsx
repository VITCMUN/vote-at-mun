/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import '../../styling/Navbar.css';
import { navigate } from '@reach/router';
import { useApolloClient, useQuery } from '@apollo/react-hooks';
import { GET_COUNCIL } from '../../typedefs';
import LoadingScreen from './LoadingScreen';

// Navbar will contain the MUN Logo on the left and Dashboard, Logout buttons on right
const Navbar = () => {
  const client = useApolloClient();
  const { loading: ld, data: d } = useQuery(GET_COUNCIL);
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
    navigate('/');
  };

  const usertype = localStorage.getItem('userType');

  if (ld) return <LoadingScreen />;
  const councilURL = d.getCouncil.url;
  const councilName = d.getCouncil.name;
  const image = `Logos/Square/${councilURL}.png`;

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
        <img src={image} className="small" alt={councilName} />
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
