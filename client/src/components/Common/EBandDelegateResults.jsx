import React, { useState } from 'react';
import { useQuery, useSubscription } from 'react-apollo';
import { Pie } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import Navbar from './Navbar.jsx';
import { CountryResults } from './CountryResults.jsx';
import '../../styling/EBandDelegateResults.css';
import { UPDATE_VOTE } from '../../subscriptions';
import '../../styling/Chart.css';
import { GET_RESULT } from '../../typedefs';
import LoadingScreen from './LoadingScreen';

const ResultPage = props => {
  const getNavbar = () => {
    return <Navbar />;
  };
  const { location } = props;
  const { vote, pollId } = location.state.data;
  let countNo = 0;
  if (vote) {
    countNo = vote ? 0 : 1;
  }

  const [votes, setVotes] = useState({
    yes: vote || 0,
    no: countNo,
  });
  const dataResult = {
    datasets: [
      {
        data: [votes.yes, votes.no],
        backgroundColor: ['#ED8C2B', '#88A825'],
        hoverBackgroundColor: ['#ED8C2B', '#88A825'],
      },
    ],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: ['Yes', 'No'],
  };

  useSubscription(UPDATE_VOTE, {
    onSubscriptionData: data => {
      setVotes({
        yes: data.subscriptionData.data.voteUpdate.countYes,
        no: data.subscriptionData.data.voteUpdate.countNo,
      });
    },
  });

  const { loading, error } = useQuery(GET_RESULT, {
    variables: { id: pollId },
    onCompleted: voteVal => {
      setVotes({
        yes: voteVal.getResult.countYes,
        no: voteVal.getResult.countNo,
      });
    },
  });

  if (loading) return <LoadingScreen />;
  if (error) return 'Contact Tech Support';

  const {data:d1} = useQuery(CURRENT_ROUTE);
  const {data:d2} = useQuery(GET_POLL_DETAILS);
  const usertype = localStorage.getItem("userType");
  if(usertype ==='0' && d1.protectRoute === 1) {
    const reqdObj = {
      pollId: d2.pollId,
      type: d2.type,
      title: d2.title,
      description: d2.description,
      total_speaker_time: d2.total_speaker_time
    }
    navigate('/vote', {
      state: { data:  reqdObj},
    });
  } else if (usertype ==='0' && d1.protectRoute === 0) {
    navigate('/');
  }

  const getEndPoll = () => {
    if(usertype === '1') {
      return <EndPoll />
    }
    return null;
  }

  return (
    <div className="Main">
      {getNavbar()}
      <p id="heading">RESULTS</p>
      <div className="endVote">
        {getEndPoll()}
      </div>
      <div className="parts">
        <div className="part1">
          <div className="result">
            <div className="chart box">
              <Pie data={dataResult} />
            </div>
          </div>
        </div>
        <div className="part2">
          <div className="country">
            <CountryResults />
          </div>
        </div>
      </div>
    </div>
  );
};

ResultPage.propTypes = {
  location: PropTypes.instanceOf(Object).isRequired,
};

export default ResultPage;
