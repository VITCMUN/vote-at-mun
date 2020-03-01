import React, { useState } from 'react';
import { useQuery, useSubscription } from 'react-apollo';
import { Pie } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import { navigate } from '@reach/router';
import Navbar from '../Common/Navbar.jsx';
import '../../styling/EBandDelegateResults.css';
import { UPDATE_VOTE, POLL_END } from '../../subscriptions';
import '../../styling/Chart.css';
import { GET_RESULT } from '../../typedefs';
import LoadingScreen from '../Common/LoadingScreen';
import EndPoll from '../EB/EndPoll';

const ResultPage = props => {
  const getNavbar = () => {
    return <Navbar />;
  };
  const { location } = props;

  const { vote = null, pollId } = location.state.data;

  let countNo = 0;
  if (vote !== null) {
    countNo = vote ? 0 : 1;
  } else {
    countNo = 0;
  }

  const [votes, setVotes] = useState({
    yes: vote === null ? 0 : vote || 0,
    no: countNo,
  });

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
    },
  });
  useSubscription(POLL_END, {
    onSubscriptionData: () => {
      const forTheMotion = votes.yes;
      const againstTheMotion = votes.no;
      const difference = forTheMotion - againstTheMotion;
      if (difference > 0) {
        Swal.fire({
          icon: 'success',
          title: 'Motion Passed',
          html: `For the motion : ${forTheMotion}<br>Against the motion : ${againstTheMotion}`,
          confirmButtonText: 'OK',
          confirmButtonColor: 'green',
          backdrop: 'rgba(188, 245, 188, 0.336)',
        });
      } else if (difference < 0) {
        Swal.fire({
          icon: 'error',
          title: 'Motion Failed',
          html: `For the motion : ${forTheMotion}<br>Against the motion : ${againstTheMotion}`,
          confirmButtonText: 'OK',
          confirmButtonColor: 'red',
          backdrop: 'rgba(253, 176, 176, 0.553)',
        });
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Tie',
          html: `For the motion : ${forTheMotion}<br>Against the motion : ${againstTheMotion}`,
          confirmButtonText: 'OK',
          confirmButtonColor: 'gray',
          backdrop: 'rgba(253, 253, 185, 0.637)',
        });
      }
      navigate('/dashboard');
    },
  });

  const { loading, error } = useQuery(GET_RESULT, {
    variables: {
      id: pollId,
    },
    onCompleted: voteVal => {
      setVotes({
        yes: voteVal.getResult.countYes,
        no: voteVal.getResult.countNo,
      });
    },
  });

  if (loading) return <LoadingScreen />;
  if (error) return 'Contact Tech Support';
  const usertype = localStorage.getItem('userType');
  const getEndPoll = () => {
    if (usertype === '1') {
      return <EndPoll yes={votes.yes} no={votes.no} />;
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
      </div>{' '}
    </div>
  );
};

ResultPage.propTypes = {
  location: PropTypes.instanceOf(Object).isRequired,
};

export default ResultPage;
