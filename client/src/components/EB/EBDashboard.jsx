import React from 'react';
import { navigate } from '@reach/router';
import { useApolloClient, useQuery } from '@apollo/react-hooks';
import { GET_ACTIVE_POLLS, GET_COUNCIL } from '../../typedefs';
import '../../styling/EBDashboard.css';
import LoadingScreen from '../Common/LoadingScreen.jsx';

const EBDashboard = () => {
  const goToPollForm = () => {
    navigate('/ebPoll');
  };

  const client = useApolloClient();
  const { loading: ld, data: d } = useQuery(GET_COUNCIL);
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
  if (ld) return <LoadingScreen />;
  const councilURL = d.getCouncil.url;
  const councilName = d.getCouncil.name;
  const image = `Logos/Square/${councilURL}.png`;

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
            <img className="card-img" src={image} alt={councilName} />
            <div className="card-text">{councilName}</div>
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
