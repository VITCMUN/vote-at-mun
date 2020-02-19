import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

import { typeDefs, IS_LOGGED_IN } from './typedefs';
import { resolvers } from './resolvers';
import App from './App';
import Login from './components/Common/login';
import ErrorBoundary from './components/Common/ErrorBoundary';
import './styling/index.css';

const cache = new InMemoryCache();

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/',
  headers: {
    authorization: localStorage.getItem('token')
      ? localStorage
          .getItem('token')
          .slice(0, localStorage.getItem('token').length - 4)
      : null,
  },
});

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true,
    connectionParams: {
      authorization: localStorage.getItem('token')
        ? localStorage
            .getItem('token')
            .slice(0, localStorage.getItem('token').length - 4)
        : null,
    },
  },
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  cache,
  link,
  typeDefs,
  resolvers,
});
// If protectRoute is 0 stay in dashboard page
// 1 then stay on voting
// 2 then stay on result
// const authtoken = localStorage.getItem('authtoken');
let authtoken = localStorage.getItem('token');
authtoken = authtoken ? authtoken.slice(authtoken.length - 4) : null;
let route = 0;
if (authtoken) {
  route = atob(authtoken);
  route = parseInt(route, 10);
}
if (!authtoken) {
  cache.writeData({
    data: {
      protectRoute: route,
      pollId: 0,
      type: 0,
      title: '',
      description: '',
      total_speaker_time: 0,
      user_type: null,
    },
  });
} else {
  cache.writeData({
    data: {
      protectRoute: route,
    },
  });
}
cache.writeData({
  data: {
    isLoggedIn: localStorage.getItem('token')
      ? !!localStorage
          .getItem('token')
          .slice(0, localStorage.getItem('token').length - 4)
      : null,
  },
});

function IsLoggedIn() {
  const { data } = useQuery(IS_LOGGED_IN);
  return data.isLoggedIn ? <App /> : <Login />;
}

ReactDOM.render(
  <ErrorBoundary>
    <ApolloProvider client={client}>
      <IsLoggedIn />
    </ApolloProvider>
  </ErrorBoundary>,
  document.getElementById('root')
);
