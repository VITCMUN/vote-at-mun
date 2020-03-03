import gql from 'graphql-tag';

export const POLL_DETAILS = gql`
  subscription onPollAdded {
    pollDetails {
      pollId
      description
      totalSpeakerTime
      raisedBy
      title
      username
    }
  }
`;
export const UPDATE_VOTE = gql`
  subscription voteadd($id: Int!) {
    voteUpdate(id: $id) {
      countYes
      countNo
      username {
        country
        value
      }
    }
  }
`;
export const POLL_END = gql`
  subscription pollend {
    pollEnd {
      twoThirdsMajority
      voteYes
      voteNo
    }
  }
`;
