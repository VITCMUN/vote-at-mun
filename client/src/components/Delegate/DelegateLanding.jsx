import React from 'react';
import '../../styling/DelegateLanding.css';
import { navigate } from '@reach/router';
import {
  useApolloClient,
  useSubscription,
  useQuery,
} from '@apollo/react-hooks';
import Swal from 'sweetalert2';
import { GET_ACTIVE_POLLS, GET_COUNCIL } from '../../typedefs';
import { POLL_DETAILS } from '../../subscriptions';
import LoadingScreen from '../Common/LoadingScreen';

function DelegateLanding() {
  const client = useApolloClient();
  const { loading: ld, data: d } = useQuery(GET_COUNCIL);
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
    onError: () => {
      Swal.fire({
        icon: 'warning',
        title: 'Something went wrong!',
        html: 'Contact Tech Team',
      });
    },
  });

  useSubscription(POLL_DETAILS, {
    shouldResubscribe: true,
    fetchPolicy: 'network-only',
    onSubscriptionData: options => {
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
    navigate('/');
  };

  if (ld) return <LoadingScreen />;
  const councilURL = d.getCouncil.url;
  const councilName = d.getCouncil.name;
  const image = `Logos/Square/${councilURL}.png`;

  return (
    <>
      <button type="button" onClick={logout} className="logout">
        Logout
      </button>
      <p className="title">WELCOME DELEGATE !</p>
      <div className="councilContainer">
        <div className="councilLogo">
          <img src={image} alt={councilName} height="300" width="300" />
        </div>
        <div className="countryFlag">
          <img
            className="countryFlagImage"
            src={imageSource}
            alt="countryFlag"
          />
        </div>
      </div>
      <div className="dlogo">
        <img src="Logos/mun.png" alt="logo" height="200" width="auto" />
      </div>
    </>
  );
}

export default DelegateLanding;
