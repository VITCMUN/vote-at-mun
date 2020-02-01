import React, { useState } from "react";
import "../styling/CountryResults.css";
import FuzzySearch from "fuzzy-search";
import { CountryNames } from "../constants/CountryNames";

// Recommended Width and Height
// width: 355px;
// height: 583px;

// Pass a function as props to get the selected items

// Country Names are used to filter countries and will be passed as selected from this component

const CountryResults = props => {
  const [countries, setCountries] = useState(
    CountryNames.map((val, index, arr) => {
      val["voted"] = "false";
      return val;
    })
  );
  console.log("Hi");
  const [keyword, setKeyword] = useState("");
  const searcher = new FuzzySearch(countries, ["name"], {
    caseSensitive: false,
    // A better matching result will be displayed first
    sort: true
  });

  const result = searcher.search(keyword);
  let countryImages;
  // If no matching result display some information
  if (result.length === 0) {
    countryImages = <b>No Such Country Exists</b>;
  } else {
    countryImages = result.map(country => (
      <div className="countryContainer" key={country.name}>
        <div className="CountryProfile" role="button" tabIndex={0}>
          <img src={country.source} className="Flag" alt={country.name} />
          <b className="countryName">{country.name}</b>
          <span
            className={country.voted !== "false" ? "Voted" : "NotVoted"}
          ></span>
        </div>
      </div>
    ));
  }

  return (
    <div className="CountriesMenu">
      <div className="CountriesMenuText">
        <b>VOTING</b>
        <div className="CountriesHeading">
          <b>Status</b>
        </div>
        <div className="search">
          <input
            onSubmit={event => event.preventDefault()}
            placeholder="Enter the country"
            type="text"
            onChange={event => setKeyword(event.target.value)}
          />
        </div>
      </div>
      <div className="CountryProfilesArea">{countryImages}</div>
    </div>
  );
};

export { CountryResults };
