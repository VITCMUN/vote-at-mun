import React from 'react';
import '../../styling/DelegateLanding.css';
// import { navigate } from '@reach/router';
import { useApolloClient } from '@apollo/react-hooks';


function DelegateLanding() {
  // insert : councilLogo, countyFlag, vitcmun logo images from /Public/
  /*
  Since for the delegate we do not have any in app sidebar we need to have a
  subscription which will trigger the navigation
  */

  // navigate('/vote');

  const client = useApolloClient();

  const logout = event => {
    event.preventDefault();
    client.writeData({
      data: {
        isLoggedIn: null,
        userType: null,
      },
    });
  };

  return (
    <>
      <button type="button" onClick={logout} className="logout">Logout</button>
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
