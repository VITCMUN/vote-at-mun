import React from 'react';
import '../../styling/DelegateLanding.css';
import { navigate } from '@reach/router';
import { useApolloClient, useSubscription } from '@apollo/react-hooks';
import { POLL_DETAILS } from '../../subscriptions';

function DelegateLanding() {
  const client = useApolloClient();

  useSubscription(POLL_DETAILS, {
    shouldResubscribe: true,
    fetchPolicy: 'network-only',
    onSubscriptionData: options => {
      if (
        options.subscriptionData.data.pollDetails.username.indexOf(
          localStorage.getItem('userName')
        ) > -1
      ) {
        navigate('vote', {
          state: { data: options.subscriptionData.data.pollDetails },
        });
      }
    },
  });

  const logout = event => {
    event.preventDefault();
    client.writeData({
      data: {
        isLoggedIn: null,
        userType: null,
      },
    });
    localStorage.clear();
  };

  return (
    <>
      <button type="button" onClick={logout} className="logout">
        Logout
      </button>
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
