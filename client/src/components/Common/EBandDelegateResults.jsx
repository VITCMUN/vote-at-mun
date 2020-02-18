import React from 'react';
import { ResultChart } from './Chart.jsx';
import Navbar from './Navbar.jsx';
import { CountryResults } from './CountryResults.jsx';
import '../../styling/EBandDelegateResults.css';
import { CURRENT_ROUTE, GET_POLL_DETAILS } from "../../typedefs";
import { useQuery } from '@apollo/react-hooks';
import { navigate } from '@reach/router';

function Result() {
  const getNavbar = () => {
    // if (user.type !== 'EB') {
    //    return <Sidebar />
    //  }
    return <Navbar />;
  };

  /*
  if user type is delegate then after the poll finishes we can have a 
  setTimeout after which they will be navigated to the Dashboard
  */

  const {data:d1} = useQuery(CURRENT_ROUTE);
  const {data:d2} = useQuery(GET_POLL_DETAILS);
  if(d1.protectRoute === 1) {
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
  } else if (d1.protectRoute === 0) {
    navigate('/');
  }

  return (
    <div className="Main">
      {getNavbar()}
      <p id="heading">RESULTS</p>
      <div className="parts">
        <div className="part1">
          <div className="result">
            <ResultChart />
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
}

export default Result;
