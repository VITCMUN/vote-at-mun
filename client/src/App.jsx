import React from 'react';
import { Router } from '@reach/router';
import Loadable from 'react-loadable';
import LoadingScreen from './components/Common/LoadingScreen';

const App = () => {
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

  return (
    <div>
      <Router>
        <DelegateDashboard path="delegate" />
        <AdminDashboard path="admin" />
        <EBDashboard path="executiveBoard" />
        <EBPoll path="ebPoll" />
        <Voting path="vote" />
        <Result path="result" />
      </Router>
    </div>
  );
};

export default App;
