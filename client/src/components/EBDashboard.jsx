import React from 'react';
import '../styling/EBDashboard.css';

const EBDashboard = () => {
  return (
    <div className="FlexContainer">
      <div className="LeftContainer">
        <img className="MunImage1" src="mun.png" alt="VITCC MUN" />
        <img className="CouncilImage" src="unsc.png" alt="VITCC MUN" />
      </div>

      <div className="RightContainer">
        <br />
        <img className="MunImage2" src="mun.png" alt="VITCC MUN" />
        <h4 className="DashboardHeading">
          <b>WELCOME EXECUTIVE BOARD!</b>
        </h4>
        <br />
        <div className="VotingButton">
          <div className="Cardboard">
            <img src="pollimg.jpg" alt="Poll" className="PollImage" />
            <button type="button" className="Vote">
              Conduct Voting
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EBDashboard;
