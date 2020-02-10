import React from 'react';
import { ResultChart } from './Chart.jsx';
import Navbar from './Navbar.jsx';
import { CountryResults } from './CountryResults.jsx';
import '../../styling/EBandDelegateResults.css';

function App() {
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

export default App;
