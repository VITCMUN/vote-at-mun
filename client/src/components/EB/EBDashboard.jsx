import React from 'react';
import '../../styling/EBDashboard.css';
import { navigate } from '@reach/router';

const EBDashboard = () => {
  const goToPollForm = () => {
    navigate('/ebPoll');
  };

  return (
    <>
      <div className="left-container">
        <img className="logo-big" src="img/mun.png" alt="VITCMUN" />
        <div className="welcome-text">
          Welcomes the Members of the Executive Board
        </div>
      </div>
      <div className="right-container">
        <div className="card">
          <div className="card-header">
            <img className="card-img" src="img/disec.png" alt="Council" />
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
