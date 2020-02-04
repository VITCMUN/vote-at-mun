import React from 'react';
import loading from '../../Loading.gif';
import '../../styling/LoadingScreen.css';

const LoadingScreen = () => (
  <div className="responsive">
    <img className="munLogo" src="mun.png" alt="MUN" />
    <div className="container">
      <div className="heading">
        <h1>VITCMUN 2020</h1>
      </div>
      <img src={loading} alt="Loading GIF" />
    </div>
  </div>
);

export default LoadingScreen;
