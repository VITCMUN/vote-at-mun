import React from 'react';
import Swal from 'sweetalert2';
import '../../styling/endButton.css';
import { navigate } from '@reach/router';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import { END_POLL } from '../../typedefs';

const EndPoll = props => {
  const [pollend] = useMutation(END_POLL, {
    onCompleted: options => {
      const forTheMotion = options.endPoll.voteYes;
      const againstTheMotion = options.endPoll.voteNo;
      const type = options.endPoll.twoThirdsMajority;
      if (!type) {
        const difference = forTheMotion - againstTheMotion;
        if (difference > 0) {
          Swal.fire({
            icon: 'success',
            title: 'Motion Passed',
            html: `For the motion : ${forTheMotion}<br>Against the motion : ${againstTheMotion}`,
            confirmButtonText: 'OK',
            confirmButtonColor: 'green',
            backdrop: 'rgba(188, 245, 188, 0.336)',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Motion Failed',
            html: `For the motion : ${forTheMotion}<br>Against the motion : ${againstTheMotion}`,
            confirmButtonText: 'OK',
            confirmButtonColor: 'red',
            backdrop: 'rgba(253, 176, 176, 0.553)',
          });
        }
      } else {
        const reqd = Math.ceil((2 * (forTheMotion + againstTheMotion)) / 3);
        if (reqd < forTheMotion) {
          Swal.fire({
            icon: 'success',
            title: 'Motion Passed',
            html: `For the motion : ${forTheMotion}<br>Against the motion : ${againstTheMotion}`,
            confirmButtonText: 'OK',
            confirmButtonColor: 'green',
            backdrop: 'rgba(188, 245, 188, 0.336)',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Motion Failed',
            html: `For the motion : ${forTheMotion}<br>Against the motion : ${againstTheMotion}`,
            confirmButtonText: 'OK',
            confirmButtonColor: 'red',
            backdrop: 'rgba(253, 176, 176, 0.553)',
          });
        }
      }
      navigate('/dashboard');
    },
  });

  const endVote = () => {
    pollend({ variables: { pollId: props.id } });
  };

  return (
    <button className="end" type="button" onClick={endVote}>
      End Vote
    </button>
  );
};

EndPoll.propTypes = {
  id: PropTypes.number,
};

EndPoll.defaultProps = {
  id: null,
};

export default EndPoll;
