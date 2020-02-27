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
    }
  }
`;
