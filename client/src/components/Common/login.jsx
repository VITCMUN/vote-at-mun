import React from 'react';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import '../../styling/login.css';
import LoginForm from './form';
import { LOGIN } from '../../typedefs';
import LoadingScreen from './LoadingScreen';

function Login() {
  const client = useApolloClient();
  const [loginUser, { loading, error }] = useMutation(LOGIN, {
    onCompleted({ login }) {
      localStorage.setItem('token', login.token);
      localStorage.setItem('userType', login.user.userType);
      localStorage.setItem('userName', login.user.username);
      client.writeData({ data: { isLoggedIn: true } });
      window.location.reload();
    },
  });

  if (loading) return <LoadingScreen />;
  if (error) return <p>An error occurred</p>;

  return (
    <div className="FlexContainer">
      <div className="LeftContainer">
        <img className="MunImage1" src="Logos/mun.png" alt="VITCMUN" />
        <img className="CouncilImage" src="Logos/dateswhite.png" alt="VITCMUN" />
      </div>

      <div className="RightContainer">
        <br />
        <img className="MunImage2" src="Logos/Square/ARAB-01.png" alt="VITCMUN" />
        <h4 className="DashboardHeading">
          <b>WELCOME</b>
        </h4>
        <br />
        <LoginForm login={loginUser} />
      </div>
    </div>
  );
}

export default Login;
