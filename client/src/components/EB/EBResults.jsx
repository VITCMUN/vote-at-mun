import React, { useState } from 'react';
import { useQuery, useSubscription } from 'react-apollo';
import { Pie } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import Navbar from '../Common/Navbar.jsx';
import { CountryResults } from '../Common/CountryResults.jsx';
import '../../styling/EBandDelegateResults.css';
import { UPDATE_VOTE } from '../../subscriptions';
import '../../styling/Chart.css';
import { GET_RESULT } from '../../typedefs';
import LoadingScreen from '../Common/LoadingScreen';
import EndPoll from './EndPoll';

const ResultPage = props => {
  const getNavbar = () => {
    return <Navbar />;
  };
  const { location } = props;
  const { pollId } = location.state.data;
  const countNo = 0;

  const [votes, setVotes] = useState({
    yes: 0,
    no: countNo,
  });
  const [votedCountry, setVotedCountry] = useState([]);
  const dataResult = {
    datasets: [
      {
        data: [votes.yes, votes.no],
        backgroundColor: ['green', 'red'],
        hoverBackgroundColor: ['green', 'red'],
      },
    ],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: ['Yes', 'No'],
  };

  useSubscription(UPDATE_VOTE, {
    variables: { id: pollId },
    onSubscriptionData: data => {
      setVotes({
        yes: data.subscriptionData.data.voteUpdate.countYes,
        no: data.subscriptionData.data.voteUpdate.countNo,
      });
      setVotedCountry(data.subscriptionData.data.voteUpdate.username);
    },
  });

  const { loading } = useQuery(GET_RESULT, {
    variables: {
      id: pollId,
    },
    onCompleted: voteVal => {
      setVotes({
        yes: voteVal.getResult.voteYes,
        no: voteVal.getResult.voteNo,
      });
    },
  });

  if (loading) return <LoadingScreen />;

  const usertype = localStorage.getItem('userType');
  const getEndPoll = () => {
    if (usertype === '1') {
      return <EndPoll id={pollId} />;
    }
    return null;
  };

  return (
    <div className="Main">
      {' '}
      {getNavbar()} <p id="heading"> RESULTS </p>{' '}
      <div className="endVote"> {getEndPoll()} </div>{' '}
      <div className="parts">
        <div className="part1">
          <div className="result">
            <div className="chart box">
              <Pie data={dataResult} />{' '}
            </div>{' '}
          </div>{' '}
        </div>{' '}
        <div className="part2">
          <div className="country">
            <CountryResults country={votedCountry} />
          </div>{' '}
        </div>{' '}
      </div>{' '}
    </div>
  );
};

ResultPage.propTypes = {
  location: PropTypes.instanceOf(Object).isRequired,
};

export default ResultPage;
