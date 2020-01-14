const { gql } = require('apollo-server');

exports.typeDefs = gql`
  type Query {
    nvotes: Int!
  }
  type Mutation {
    vote(val: Boolean!): Int!
    addUser(
      username: String!
      password: String!
      userType: Int!
      displayPicUrl: String
      stance: Int!
    ): String!
    login(username: String!, password: String!): loginResponse!
  }
  type User {
    username: String!
    userType: Int!
  }
  type loginResponse {
    user: User!
    token: String!
  }
  type Subscription {
    voteUpdate: Int!
  }
`;
