import React from 'react';
import '../styling/DelegateLanding.css';

function DelegateLanding() {
  // insert : councilLogo, countyFlag, vitcmun logo images from /Public/
  return (
    <>
      <p className="title">WELCOME DELEGATE !</p>
      <div className="councilContainer">
        <div className="councilLogo">
          <img src="" alt="councilLogo" height="300" width="300" />
        </div>
        <div className="countryFlag">
          <img src="" alt="countryFlag" height="250" width="450" />
        </div>
      </div>
      <div className="logo">
        <img src="" alt="logo" height="330" width="330" />
      </div>
    </>
  );
}

export default DelegateLanding;
