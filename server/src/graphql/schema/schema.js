const { gql } = require("apollo-server");

exports.typeDefs = gql`
  type Query {
    getDelegates: [String!]
    getActivePolls: [Int!]
  }
  type Mutation {
    addUser(userDetails: userDetails!): String!
    removeUser(username: String!): Int!
    login(username: String!, password: String!): loginResponse!
    addPoll(pollDetails: pollDetails!): String!
    setCouncil(name: String!, bannerUrl: String): String!
    vote(voteDetails: voteDetails): Boolean!
    endPoll(id: Int!): String!
  }
  type Subscription {
    voteUpdate: vote
    pollDetails: pollUpdate!
    pollEnd: Int!
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
    title: String!
    description: String!
    totalSpeakerTime: Int!
    raisedBy: String
    username: [String]
  }
  type pollUpdate {
    pollId: Int!
    title: String
    description: String
    totalSpeakerTime: Int
    votingType: Int!
    raisedBy: String
    username: [String]
  }
  type vote {
    countYes: Int!
    countNo: Int!
  }
  input userDetails {
    username: String!
    password: String!
    userType: Int!
    displayPicUrl: String
    stance: Int
    observer: Boolean
  }
`;
