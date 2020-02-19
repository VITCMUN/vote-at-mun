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
      let route = localStorage.getItem('token');
      route = atob(route.slice(route.length - 4));
      if (route !== '1') {
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

  let currToken = localStorage.getItem('token');
  const currView = atob(currToken.slice(currToken.length - 4));
  if (currView === '0' || currView === '1' || currView === '2')
    currToken = currToken.slice(0, currToken.length - 4).concat(btoa('0'));
  else currToken = currToken.concat(btoa('0'));
  localStorage.setItem('token', currToken);

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
