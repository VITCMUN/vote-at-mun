import React from 'react';
import { useApolloClient, useMutation, useQuery } from '@apollo/react-hooks';
import '../../styling/login.css';
import LoginForm from './form';
import { LOGIN, GET_COUNCIL } from '../../typedefs';
import LoadingScreen from './LoadingScreen';

function Login() {
  const client = useApolloClient();
  const [loginUser, { loading }] = useMutation(LOGIN, {
    onCompleted({ login }) {
      localStorage.setItem('token', login.token);
      localStorage.setItem('userType', login.user.userType);
      localStorage.setItem('userName', login.user.username);
      client.writeData({
        data: {
          isLoggedIn: true,
        },
      });
      window.location.reload();
    },
  });
  const { loading: ld, data: d } = useQuery(GET_COUNCIL);
  if (loading || ld) return <LoadingScreen />;
  const councilURL = d.getCouncil.url;
  const councilName = d.getCouncil.name;
  const image = `Logos/Square/${councilURL}.png`;
  return (
    <div className="FlexContainer">
      <div className="LeftContainer">
        <img className="MunImage1" src="dateLogo.png" alt="VITCMUN" />
      </div>
      <div className="RightContainer">
        <br />
        <img className="MunImage2" src={image} alt={councilName} />
        <h4 className="DashboardHeading">
          <b> WELCOME </b>{' '}
        </h4>{' '}
        <br />
        <LoginForm login={loginUser} />{' '}
      </div>{' '}
    </div>
  );
}

export default Login;
