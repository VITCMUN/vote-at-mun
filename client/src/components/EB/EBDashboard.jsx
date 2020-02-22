import React from 'react';
import '../../styling/EBDashboard.css';
import { navigate } from '@reach/router';
import { useApolloClient } from '@apollo/react-hooks';

const EBDashboard = () => {
  const goToPollForm = () => {
    navigate('/ebPoll');
  };

  const client = useApolloClient();

  const logout = event => {
    event.preventDefault();
    client.writeData({
      data: {
        isLoggedIn: null,
        userType: null,
      },
    });
  };

  return (
    <>
      <div className="left-container">
        <button type="button" className="logout" onClick={logout}>
          Logout
        </button>
        <img className="logo-big" src="Logos/mun.png" alt="VITCMUN" />
        <div className="welcome-text">
          Welcomes the Members of the Executive Board
        </div>
      </div>
      <div className="right-container">
        <div className="card">
          <div className="card-header">
            <img className="card-img" src="Logos/Square/Arab-01.png" alt="Council" />
            <div className="card-text">DISEC</div>
          </div>
          <div className="card-body">
            <button type="button" className="button" onClick={goToPollForm}>
              Conduct Voting
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EBDashboard;
