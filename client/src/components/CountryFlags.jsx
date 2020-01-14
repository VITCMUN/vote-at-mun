import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styling/CountryFlags.css';
import FuzzySearch from 'fuzzy-search';
import {CountryNames} from '../constants/CountryNames';

// Recommended Width and Height
// width: 355px;
// height: 583px;

// Pass a function as props to get the selected items

// Country Names are used to filter countries and will be passed as selected from this component

const CountryFlags = props => {
  const { getSelected, selectedArray } = props;
  const [selected, setSelected] = useState(selectedArray);
  const [keyword, setKeyword] = useState('');
  const searcher = new FuzzySearch(CountryNames, ['name'], {
    caseSensitive: false,
    // A better matching result will be displayed first
    sort: true,
  });

  // Add the country to selected or deselect it
  const addRemoveIndex = name => {
    const copy = [...selected];
    if (copy.includes(name)) {
      copy.splice(copy.indexOf(name), 1);
    } else {
      copy.push(name);
    }
    setSelected(copy);
  };

  const clearAll = () => {
    setSelected([]);
  };

  const selectAll = () => {
    const copy = [];
    CountryNames.map(country => copy.push(country.name));
    setSelected(copy);
  };

  // If country is selected then change display of that country
  const getImage = country => {
    if (selected.includes(country.name)) {
      return (
        <img
          src={country.source}
          className="Flag Selected"
          alt={country.name}
        />
      );
    }
    return <img src={country.source} className="Flag" alt={country.name} />;
  };

  const handleKeyPress = (event, country) => {
    if (event.keyCode === 13) {
      addRemoveIndex(country.name);
    }
  };

  const result = searcher.search(keyword);
  let countryImages;
  // If no matching result display some information
  if (result.length === 0) {
    countryImages = <b>No Such Country Exists</b>;
  } else {
    countryImages = result.map(country => (
      <div className="countryContainer" key={country.name}>
        <div
          onClick={() => addRemoveIndex(country.name)}
          className="CountryProfile"
          role="button"
          tabIndex={0}
          onKeyPress={event => handleKeyPress(event, country)}
        >
          {getImage(country)}
          <b className="countryName">{country.name}</b>
        </div>
      </div>
    ));
  }

  return (
    <div className="CountriesMenu">
      <div className="CountriesMenuText">
        <b>UNHRC</b>
        <div className="CountriesHeading">
          <b>Countries</b>
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
      <button className="selectorCountry" onClick={clearAll} type="button">
        Clear All
      </button>
      <button className="selectorCountry" onClick={getSelected} type="button">
        Submit
      </button>
      <button className="selectorCountry" onClick={selectAll} type="button">
        Select All
      </button>
    </div>
  );
};

// Validating the props passed

CountryFlags.propTypes = {
  selectedArray: PropTypes.shape([]),
  getSelected: PropTypes.func.isRequired,
};

CountryFlags.defaultProps = {
  selectedArray: [],
};

export { CountryFlags };
