const { gql } = require('apollo-server');

exports.typeDefs = gql`
  type Query {
    nvotes: Int!
  }
  type Mutation {
    vote(val: Boolean!): Int!
  }
  type Subscription {
    vote_update: Int!
  }
`;
