const { gql } = require('apollo-server');

exports.typeDefs = gql`
  type Query {
    nvotes: Int!
  }
  type Mutation {
    vote(val: Boolean!): Int!
    addUser(userDetails: userDetails!): String!
    login(username: String!, password: String!): loginResponse!
    addPoll(pollDetails: pollDetails!): String!
    setCouncil(name: String!,bannerUrl: String): String!
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
    pollDetails: pollUpdate!
  }
  input pollDetails {
    title: String
    description: String
    totalSpeakerTime: Int
    votingType: Int!
    raisedBy: String
  }
  type pollUpdate {
    title: String
    description: String
    totalSpeakerTime: Int
    votingType: Int!
    raisedBy: String
  }
  input userDetails{
    username: String!
    password: String!
    userType: Int!
    displayPicUrl: String
    stance: Int!
    observer: Boolean!
  }
`;
