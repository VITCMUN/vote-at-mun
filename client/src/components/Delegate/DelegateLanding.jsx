import React from 'react';
import '../../styling/DelegateLanding.css';
import { navigate } from '@reach/router';
import {
  useApolloClient,
  useSubscription,
  useQuery,
} from '@apollo/react-hooks';
import { GET_ACTIVE_POLLS } from '../../typedefs';
import { POLL_DETAILS } from '../../subscriptions';

function DelegateLanding() {
  const client = useApolloClient();

  useQuery(GET_ACTIVE_POLLS, {
    fetchPolicy: 'network-only',
    onCompleted: data => {
      const activePolls = data.getActivePolls;
      if (activePolls.length > 0) {
        const activePoll = activePolls[activePolls.length - 1];
        if (
          activePoll.username.indexOf(localStorage.getItem('userName')) > -1
        ) {
          navigate('result', {
            state: {
              data: { pollId: activePoll.pollId },
            },
          });
        } else {
          navigate('vote', {
            state: { data: activePoll },
          });
        }
      }
    },
  });

  useSubscription(POLL_DETAILS, {
    shouldResubscribe: true,
    fetchPolicy: 'network-only',
    onSubscriptionData: options => {
      console.log(options);
      if (
        options.subscriptionData.data.pollDetails.username.indexOf(
          localStorage.getItem('userName')
        ) > -1
      ) {
        navigate('result', {
          state: {
            data: { pollId: options.subscriptionData.data.pollDetails.pollId },
          },
        });
      } else {
        navigate('vote', {
          state: { data: options.subscriptionData.data.pollDetails },
        });
      }
    },
  });

  const username = localStorage.getItem('userName').toLowerCase();
  const imageSource = `square/${username}.webp`;

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
          <img
            src="Logos/Square/Arab-01.png"
            alt="councilLogo"
            height="300"
            width="300"
          />
        </div>
        <div className="countryFlag">
          <img src={imageSource} alt="countryFlag" height="250" width="450" />
        </div>
      </div>
      <div className="logo">
        <img src="Logos/mun.png" alt="logo" height="200" width="auto" />
      </div>
    </>
  );
}

export default DelegateLanding;
