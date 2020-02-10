import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';

import { typeDefs, IS_LOGGED_IN } from './typedefs';
import { resolvers } from './resolvers';
import App from './App';
import ErrorBoundary from './components/Common/ErrorBoundary';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:4000/',
  headers: {
    authorization: localStorage.getItem('token'),
  },
});

const client = new ApolloClient({
  cache,
  link,
  typeDefs,
  resolvers,
});

cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem('token'),
    userType: localStorage.getItem('userType'),
  },
});

function IsLoggedIn() {
  const { data } = useQuery(IS_LOGGED_IN);
  return data.isLoggedIn ? <App /> : <App />;
}

ReactDOM.render(
  <ErrorBoundary>
    <ApolloProvider client={client}>
      <IsLoggedIn />
    </ApolloProvider>
  </ErrorBoundary>,
  document.getElementById('root')
);
