import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }
`;

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

export const GET_DELEGATES = gql`
  query GetDelegates {
    getDelegates
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        userType
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $password: String!
    $userType: Int!
    $displayPicUrl: String
    $stance: Int
    $observer: Boolean
  ) {
    addUser(
      userDetails: {
        username: $username
        password: $password
        userType: $userType
        displayPicUrl: $displayPicUrl
        stance: $stance
        observer: $observer
      }
    )
  }
`;

export const REMOVE_USER = gql`
  mutation removeUser($username: String!) {
    removeUser(username: $username)
  }
`;

export const SET_COUNCIL = gql`
  mutation setCouncil($name: String!, $bannerUrl: String!) {
    setCouncil(name: $name, bannerUrl: $bannerUrl)
  }
`;

export const ADD_POLL = gql`
  mutation addPoll(
    $title: String!
    $description: String!
    $totalSpeakerTime: Int!
    $raisedBy: String
    $username: [String]
    $twoThirdsMajority: Boolean!
  ) {
    addPoll(
      pollDetails: {
        title: $title
        description: $description
        totalSpeakerTime: $totalSpeakerTime
        raisedBy: $raisedBy
        username: $username
        twoThirdsMajority: $twoThirdsMajority
      }
    )
  }
`;

export const VOTE = gql`
  mutation vote($pollId: Int!, $vote: Boolean!) {
    vote(voteDetails: { vote: $vote, pollId: $pollId })
  }
`;

export const GET_RESULT = gql`
  query GetResult($id: Int!) {
    getResult(id: $id) {
      countYes
      countNo
    }
  }
`;

export const GET_ACTIVE_POLLS = gql`
  query GetActivePolls {
    getActivePolls {
      pollId
      description
      totalSpeakerTime
      raisedBy
      title
      username
    }
  }
`;

export const END_POLL = gql`
  mutation endpoll($pollId: Int!) {
    endPoll(id: $pollId)
  }
`;
