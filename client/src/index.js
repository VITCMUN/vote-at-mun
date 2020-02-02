import React from 'react';
import ReactDOM from 'react-dom';
// import { ApolloClient } from 'apollo-client';
// import { InMemoryCache } from 'apollo-cache-inmemory';
// import { HttpLink } from 'apollo-link-http';
import App from './App';

// const cache = new InMemoryCache();
// const link = new HttpLink({
//   uri: 'http://localhost:4000/',
// });

// const client = new ApolloClient({
//   cache,
//   link,
// });

ReactDOM.render(<App />, document.getElementById('root'));
