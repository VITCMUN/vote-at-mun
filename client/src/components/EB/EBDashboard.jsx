import React from 'react';
import { navigate } from '@reach/router';
import { useApolloClient, useQuery } from '@apollo/react-hooks';
import { GET_ACTIVE_POLLS } from '../../typedefs';
import '../../styling/EBDashboard.css';

const EBDashboard = () => {
  const goToPollForm = () => {
    navigate('/ebPoll');
  };

  const client = useApolloClient();

  useQuery(GET_ACTIVE_POLLS, {
    onCompleted: data => {
      const polls = data.getActivePolls;
      if (polls.length > 0) {
        const poll = polls[polls.length - 1];
        navigate('/result', { state: { data: { pollId: poll.pollId } } });
      }
    },
  });

  const logout = event => {
    event.preventDefault();
    client.writeData({
      data: {
        isLoggedIn: null,
        userType: null,
      },
    });
    localStorage.clear();
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
            <img
              className="card-img"
              src="Logos/Square/Arab-01.png"
              alt="Council"
            />
            <div className="card-text">Arab League</div>
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
