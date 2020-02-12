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

const cache = new InMemoryCache();

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/',
  headers: {
    authorization: localStorage.getItem('token'),
  },
});

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  headers: {
    authorization: localStorage.getItem('token'),
  },
  options: {
    reconnect: true,
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

cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem('token'),
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
