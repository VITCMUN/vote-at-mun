import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    protectRoute: Int!
    pollId: Int!
    type: Int!
    title: String
    description: String
    total_speaker_time: Int!
  }
`;

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

export const CURRENT_ROUTE = gql`
  query isRouteProtected {
    protectRoute @client
  }
`;

export const GET_POLL_DETAILS = gql`
  query getPollDetails {
    pollId @client
    type @client
    title @client
    description @client
    total_speaker_time @client
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
    $title: String
    $description: String
    $totalSpeakerTime: Int
    $votingType: Int!
    $raisedBy: String
  ) {
    addPoll(
      pollDetails: {
        title: $title
        description: $description
        totalSpeakerTime: $totalSpeakerTime
        votingType: $votingType
        raisedBy: $raisedBy
      }
    )
  }
`;

export const VOTE = gql`
  mutation vote($pollId: Int!, $vote: Boolean!) {
    vote(voteDetails: { vote: $vote, pollId: $pollId })
  }
`;
