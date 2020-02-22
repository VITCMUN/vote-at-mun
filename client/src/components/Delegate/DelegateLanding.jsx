import React from 'react';
import '../../styling/DelegateLanding.css';
import { navigate } from '@reach/router';
import {
  useApolloClient,
  useSubscription,
  useQuery,
} from '@apollo/react-hooks';
import { POLL_DETAILS } from '../../subscriptions';
import { CURRENT_ROUTE, GET_POLL_DETAILS } from '../../typedefs';

function DelegateLanding() {
  const { data: d1 } = useQuery(CURRENT_ROUTE);
  const { data: d2 } = useQuery(GET_POLL_DETAILS);
  if (d1.protectRoute === 1) {
    navigate('/vote');
  } else if (d1.protectRoute === 2) {
    navigate('/result', {
      state: { data: d2.pollId },
    });
  }
  const client = useApolloClient();
  useSubscription(POLL_DETAILS, {
    shouldResubscribe: true,
    onSubscriptionData: options => {
      const route = localStorage.getItem('authtoken');
      if (route[0] !== '1') {
        client.writeData({
          data: {
            protectRoute: 1,
            pollId: options.subscriptionData.data.pollDetails.pollId,
            type: options.subscriptionData.data.pollDetails.votingType,
            title: options.subscriptionData.data.pollDetails.title,
            description: options.subscriptionData.data.pollDetails.description,
            total_speaker_time:
              options.subscriptionData.data.pollDetails.totalSpeakerTime,
          },
        });
      }
      navigate('/vote');
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
  };

  localStorage.setItem('authtoken', '0dbsfbifbdufvdbfudbfudsfouseoufauoefwr');

  return (
    <>
      <button type="button" onClick={logout} className="logout">
        Logout
      </button>
      <p className="title">WELCOME DELEGATE !</p>
      <div className="councilContainer">
        <div className="councilLogo">
          <img src="Logos/Square/Arab-01.png" alt="councilLogo" height="300" width="300" />
        </div>
        <div className="countryFlag">
          <img src="square/iran.webp" alt="countryFlag" height="250" width="450" />
        </div>
      </div>
      <div className="logo">
        <img src="Logos/mun.png" alt="logo" height="200" width="auto" />
      </div>
    </>
  );
}

export default DelegateLanding;
