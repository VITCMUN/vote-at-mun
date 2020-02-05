const { gql } = require('apollo-server');

exports.typeDefs = gql`
  type Query{
    nvotes: Int!
  }
  type Mutation {
    addUser(userDetails: userDetails!): String!
    login(username: String!, password: String!): loginResponse!
    addPoll(pollDetails: pollDetails!): String!
    setCouncil(name: String!,bannerUrl: String): String!
    vote(voteDetails: voteDetails): Boolean!
  }
  type Subscription {
    voteUpdate: Int!
    pollDetails: pollUpdate!
  }
  type User {
    username: String!
    userType: Int!
  }
  type loginResponse {
    user: User!
    token: String!
  }
  input voteDetails {
    pollId: Int!
    vote: Boolean!
  }
  input pollDetails {
    title: String
    description: String
    totalSpeakerTime: Int
    votingType: Int!
    raisedBy: String
  }
  type pollUpdate {
    pollId: Int!
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
