import React from "react";
import "./App.css";
import { ResultChart } from "./Components/Chart.jsx";
import Sidebar from "./Sidebar.jsx";
import { CountryResults } from "./Components/CountryResults.jsx";

function App(props) {
  return (
    <div className="Main">
      <Sidebar />
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
