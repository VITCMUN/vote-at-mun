import React, { useState } from 'react';
import '../../styling/Voting.css';
import { navigate } from '@reach/router';
import { useApolloClient, useMutation, useQuery } from '@apollo/react-hooks';
import Navbar from '../Common/Navbar';
import LoadingScreen from '../Common/LoadingScreen';
import { VOTE, CURRENT_ROUTE, GET_POLL_DETAILS } from '../../typedefs';

const Voting = () => {
  const client = useApolloClient();
  const { data: d1 } = useQuery(CURRENT_ROUTE);
  const { data: d2 } = useQuery(GET_POLL_DETAILS);
  if (d1 && d1.protectRoute === 0) {
    navigate('/');
  } else if (d1 && d1.protectRoute === 2) {
    navigate('/result', { state: { pollId: d2.pollId } });
  }
  console.log(d2);
  const initial = {
    pollId: d2.pollId,
    type: d2.votingType,
    title: d2.title,
    description: d2.description,
    total_speaker_time: d2.total_speaker_time,
  };
  localStorage.setItem(
    'authtoken',
    '1dbsf34567854exdcfvgbvgcdfxe4567bifbdufvdbfudbfudsfouseoufauoefwr'
  );
  const [vote] = useState(initial);
  const [renderButton] = useState(true);
  const [selected, setSelected] = useState(null);
  const [voteMutation, { loading, error }] = useMutation(VOTE, {
    onCompleted() {
      client.writeData({
        data: {
          protectRoute: 2,
        },
      });
      navigate('/result', { state: { pollId: vote.pollId } });
    },
  });
  if (loading) return <LoadingScreen />;
  if (error) return <p>An error occurred</p>;

  const handleVote = () => {
    voteMutation({ variables: { pollId: vote.pollId, vote: selected } });
  };

  const getButtons = () => {
    let buttonYes = (
      <button
        onClick={() => setSelected(true)}
        className="pollBtn"
        type="button"
      >
        YES
      </button>
    );
    let buttonNo = (
      <button
        onClick={() => setSelected(false)}
        className="pollBtn"
        type="button"
      >
        NO
      </button>
    );

    if (selected) {
      buttonYes = (
        <button
          onClick={() => setSelected(true)}
          className="pollBtn selected"
          type="button"
        >
          YES
        </button>
      );
      buttonNo = (
        <button
          onClick={() => setSelected(false)}
          className="pollBtn notSelected"
          type="button"
        >
          NO
        </button>
      );
    }

    if (selected === false) {
      buttonYes = (
        <button
          onClick={() => setSelected(true)}
          className="pollBtn notSelected"
          type="button"
        >
          YES
        </button>
      );
      buttonNo = (
        <button
          onClick={() => setSelected(false)}
          className="pollBtn selected"
          type="button"
        >
          NO
        </button>
      );
    }

    return (
      <div className="votingButtons">
        <div className="voteYes">{buttonYes}</div>
        <div className="voteNo">{buttonNo}</div>
      </div>
    );
  };

  const proceed = () => {
    if (selected != null) {
      return (
        <button onClick={handleVote} className="proceedBtn" type="button">
          Vote
        </button>
      );
    }
    return null;
  };

  return (
    <div className="container">
      <Navbar />
      <div className="heading">
        <h1 className="headingText">Delegate Voting</h1>
      </div>
      <div className="pollInfo">
        <div className="pollBox pollTitle">
          <h1 className="labelHeading">TITLE:</h1>
          <h1 className="pollDetail">{vote.title}</h1>
        </div>
        <div className="pollBox pollTitle">
          <h1 className="labelHeading">Description:</h1>
          <h1 className="pollDetail">{vote.description}</h1>
        </div>
        <div className="pollBox pollSpeakerTime">
          <h1 className="labelHeading">TOTAL SPEAKER TIME:</h1>
          <h1 className="pollDetail">{vote.total_speaker_time} minutes</h1>
        </div>
      </div>
      <div className="proceed">{proceed()}</div>
      {renderButton && getButtons()}
    </div>
  );
};

export default Voting;
