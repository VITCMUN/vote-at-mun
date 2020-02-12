import React, { useState } from 'react';
import '../../styling/Voting.css';
import { navigate } from '@reach/router';
import Navbar from '../Common/Navbar';

const Voting = () => {
  const initial = {
    type: '',
    title: '',
    total_speaker_time: 0,
    individual_speaker_time: 0,
  };
  // const [vote, setVote] = useState(initial);
  // This will ensure delegate does not cast a vote before vote details
  // are displayed
  // const [renderButton, setRenderButton] = useState(false);
  const [vote] = useState(initial);
  const [renderButton] = useState(true);
  // 0 none selected
  // 1 yes selected
  // 2 no selected
  const [selected, setSelected] = useState(0);
  // useEffect(() => fetchVoteDetails(query));

  // Get the vote details from the graphql endpoint
  // const fetchVoteDetails = async payload => {
  //   const response = await graphQLCall(payload);
  //   setVote(response.data)
  //   setRenderButton(true);
  // }

  const handleVote = () => {
    // voteResult = selected;
    // const submitVote = async payload => {
    // const response = await graphQLCall(payload);
    // redirect to vote complete page
    navigate('/result');
  };

  const getButtons = () => {
    let buttonYes = (
      <button onClick={() => setSelected(1)} className="pollBtn" type="button">
        YES
      </button>
    );
    let buttonNo = (
      <button onClick={() => setSelected(2)} className="pollBtn" type="button">
        NO
      </button>
    );

    if (selected === 1) {
      buttonYes = (
        <button
          onClick={() => setSelected(1)}
          className="pollBtn selected"
          type="button"
        >
          YES
        </button>
      );
      buttonNo = (
        <button
          onClick={() => setSelected(2)}
          className="pollBtn notSelected"
          type="button"
        >
          NO
        </button>
      );
    }

    if (selected === 2) {
      buttonYes = (
        <button
          onClick={() => setSelected(1)}
          className="pollBtn notSelected"
          type="button"
        >
          YES
        </button>
      );
      buttonNo = (
        <button
          onClick={() => setSelected(2)}
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
    if (selected) {
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
        <div className="pollBox pollType">
          <h1 className="labelHeading">TYPE:</h1>
          <h1 className="pollDetail">{vote.type}</h1>
        </div>
        <div className="pollBox pollTitle">
          <h1 className="labelHeading">TITLE:</h1>
          <h1 className="pollDetail">{vote.title}</h1>
        </div>
        <div className="pollBox pollSpeakerTime">
          <h1 className="labelHeading">TOTAL SPEAKER TIME:</h1>
          <h1 className="pollDetail">{vote.total_speaker_time} minutes</h1>
        </div>
        <div className="pollBox pollIndividualTime">
          <h1 className="labelHeading">INDIVIDUAL SPEAKER TIME:</h1>
          <h1 className="pollDetail">{vote.individual_speaker_time} minutes</h1>
        </div>
      </div>
      <div className="proceed">{proceed()}</div>
      {renderButton && getButtons()}
    </div>
  );
};

export default Voting;
