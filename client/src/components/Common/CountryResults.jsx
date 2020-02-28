import React, { useState } from 'react';
import '../../styling/CountryResults.css';
import FuzzySearch from 'fuzzy-search';
import PropTypes from 'prop-types';
import { CountryNames } from '../../constants/CountryNames';

// Recommended Width and Height
// width: 355px;
// height: 583px;

// Pass a function as props to get the selected items

// Country Names are used to filter countries and will be passed as selected from this component

// function setNewCountries(countries, votedCountries) {
//   if (votedCountries.length > 0) {
//     let votedIndex = 0;
//     return countries.map(val => {
//       if (val.name === votedCountries[votedIndex].country) {
//         val.voteStatus = votedCountries[votedIndex].value;
//         val.voted = true;
//         votedIndex += votedIndex;
//       }
//       return val;
//     });
//   }
//   return countries;
// }

const CountryResults = props => {
  let countries = CountryNames.map(val => {
    // eslint-disable-next-line no-param-reassign
    val.voted = false;
    // eslint-disable-next-line no-param-reassign
    val.voteStatus = null;
    return val;
  });

  const { country: votedCountries } = props;
  if (votedCountries && votedCountries.length > 0) {
    votedCountries.map(cont => {
      countries = countries.map(val => {
        if (val.name === cont.country) {
          // eslint-disable-next-line no-param-reassign
          val.voteStatus = cont.value;
          // eslint-disable-next-line no-param-reassign
          val.voted = true;
        }
        return val;
      });
      return null;
    });
  }
  const [keyword, setKeyword] = useState('');
  const searcher = new FuzzySearch(countries, ['name'], {
    caseSensitive: false,
    // A better matching result will be displayed first
    sort: true,
  });

  const result = searcher.search(keyword);
  let countryImages;
  // If no matching result display some information
  if (result.length === 0) {
    countryImages = <b>No Such Country Exists</b>;
  } else {
    countryImages = result.map(country => {
      if (country.voted === false) {
        return (
          <div className="countryContainer" key={country.name}>
            <div className="CountryProfile" role="button" tabIndex={0}>
              <img src={country.source} className="Flag" alt={country.name} />
              <b className="countryName">{country.name}</b>
              <span className="NotVoted" />
            </div>
          </div>
        );
      }
      return [];
    });
    countryImages = countryImages.concat(
      result.map(country => {
        if (country.voted === true && country.voteStatus === true) {
          return (
            <div className="countryContainer" key={country.name}>
              <div className="CountryProfile" role="button" tabIndex={0}>
                <img src={country.source} className="Flag" alt={country.name} />
                <b className="countryName">{country.name}</b>
                <span className="VotedYes" />
              </div>
            </div>
          );
        }
        return null;
      })
    );
    countryImages = countryImages.concat(
      result.map(country => {
        if (country.voted === true && country.voteStatus === false) {
          return (
            <div className="countryContainer" key={country.name}>
              <div className="CountryProfile" role="button" tabIndex={0}>
                <img src={country.source} className="Flag" alt={country.name} />
                <b className="countryName">{country.name}</b>
                <span className="VotedNo" />
              </div>
            </div>
          );
        }
        return null;
      })
    );
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
CountryResults.propTypes = {
  country: PropTypes.objectOf,
};
CountryResults.defaultProps = {
  country: {
    country: '',
    value: false,
  },
};
export { CountryResults };
