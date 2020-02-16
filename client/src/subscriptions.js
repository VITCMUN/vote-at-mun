import gql from 'graphql-tag';

export const POLL_DETAILS = gql`
  subscription onPollAdded {
    pollDetails {
      pollId
      votingType
      description
      totalSpeakerTime
      raisedBy
      title
    }
  }
`;
