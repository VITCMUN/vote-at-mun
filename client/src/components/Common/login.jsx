import React from 'react';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import '../../styling/EBDashboard.css';
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
    },
  });

  if (loading) return <LoadingScreen />;
  if (error) return <p>An error occurred</p>;

  return (
    <div className="FlexContainer">
      <div className="LeftContainer">
        <img className="MunImage1" src="mun.png" alt="VITCC MUN" />
        <img className="CouncilImage" src="mun1.png" alt="VITCC MUN" />
      </div>

      <div className="RightContainer">
        <br />
        <img className="MunImage2" src="mun.png" alt="VITCC MUN" />
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
