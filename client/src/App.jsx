import React from 'react';
import { Router, navigate } from '@reach/router';
import Loadable from 'react-loadable';
import LoadingScreen from './components/Common/LoadingScreen';

const App = () => {
  const auth = localStorage.getItem('authtoken');
  if (auth) {
    if (auth[0] === '0') {
      navigate('/');
    } else if (auth[0] === '1') {
      navigate('/vote');
    } else if (auth[0] === '2') {
      navigate('/result');
    }
  }
  // Loadable is used so that when an user accesses the voting app
  // the entire app isn't sent. Only the required portion is sent
  const DelegateDashboard = Loadable({
    loader: () => import('./components/Delegate/DelegateLanding'),
    loading: LoadingScreen,
  });

  const EBDashboard = Loadable({
    loader: () => import('./components/EB/EBDashboard'),
    loading: LoadingScreen,
  });

  const AdminDashboard = Loadable({
    loader: () => import('./components/Admin/admindashboard'),
    loading: LoadingScreen,
  });

  const EBPoll = Loadable({
    loader: () => import('./components/EB/EBPoll'),
    loading: LoadingScreen,
  });

  const Voting = Loadable({
    loader: () => import('./components/Delegate/Voting'),
    loading: LoadingScreen,
  });

  const Result = Loadable({
    loader: () => import('./components/Common/EBandDelegateResults'),
    loading: LoadingScreen,
  });

  const userType = localStorage.getItem('userType');
  const getRoutes = () => {
    if (userType === '0') {
      return (
        <Router>
          <Voting path="vote" />
          <Result path="result" />
          <DelegateDashboard path="/*" />
        </Router>
      );
    }
    if (userType === '1') {
      return (
        <Router>
          <EBPoll path="ebPoll" />
          <Result path="result" />
          <EBDashboard path="/*" />
        </Router>
      );
    }
    if (userType === '2') {
      return (
        <Router>
          <AdminDashboard path="/*" />
        </Router>
      );
    }
    return <h2>Contact Tech Support</h2>;
  };

  return <div>{getRoutes()}</div>;
};

export default App;
