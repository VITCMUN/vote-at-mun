const { gql } = require('apollo-server');

exports.typeDefs = gql`
  type Query {
    getDelegates: [String!]
    getActivePolls: [pollUpdate!]
    getPollDetails(id: Int!): pollDet!
    getResult(id: Int!): EndPoll!
    getCouncil: Council!
  }
  type Mutation {
    addUser(userDetails: userDetails!): String!
    removeUser(username: String!): Int!
    login(username: String!, password: String!): loginResponse!
    addPoll(pollDetails: pollDetails!): Int!
    setCouncil(name: String!, bannerUrl: String): String!
    vote(voteDetails: voteDetails): Boolean!
    endPoll(id: Int!): EndPoll!
  }
  type Subscription {
    voteUpdate(id: Int!): vote
    pollDetails: pollUpdate!
    pollEnd: EndPoll!
  }
  type EndPoll{
    twoThirdsMajority: Boolean!
    voteYes: Int!
    voteNo: Int!
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
    twoThirdsMajority: Boolean!
  }
  type pollUpdate {
    pollId: Int!
    title: String
    description: String
    totalSpeakerTime: Int
    raisedBy: String
    username: [String]
    twoThirdsMajority: Boolean!
  }
  type pollDet {
    pollId: Int!
    title: String!
    description: String!
    totalSpeakerTime: Int!
    raisedBy: String
  }
  type vote {
    countYes: Int!
    countNo: Int!
    username: [votevalue]
  }
  type votevalue {
    country: String
    value: Boolean
  }
  type Council{
    name: String!
    url: String!
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
