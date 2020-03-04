import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import { split, ApolloLink } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { onError } from 'apollo-link-error';

import Swal from 'sweetalert2';

import { typeDefs, IS_LOGGED_IN } from './typedefs';
import { resolvers } from './resolvers';
import App from './App';
import Login from './components/Common/login';
import ErrorBoundary from './components/Common/ErrorBoundary';
import './styling/index.css';

const cache = new InMemoryCache();

const serverIP = 'localhost';

const httpLink = new HttpLink({
  uri: `http://${serverIP}:4000/`,
  headers: {
    authorization: localStorage.getItem('token'),
  },
});

const wsLink = new WebSocketLink({
  uri: `ws://${serverIP}:4000/graphql`,
  options: {
    reconnect: true,
    connectionParams: {
      authorization: localStorage.getItem('token'),
    },
  },
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message }) =>
      Swal.fire({
        icon: 'error',
        title: message,
        html: '<p>Please contact our Tech team.</p>',
      })
    );
  if (networkError) {
    Swal.fire({
      icon: 'warning',
      title: 'Aw! Snap',
      html:
        '<strong>Some Network Error Occured</strong><br>Please contact our Tech team.',
    });
  }
});

const splitLink = split(
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

const link = ApolloLink.from([errorLink, splitLink]);

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
