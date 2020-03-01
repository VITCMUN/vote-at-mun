import React from 'react';
import Swal from 'sweetalert2';
import '../../styling/endButton.css';
import { navigate } from '@reach/router';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import { END_POLL } from '../../typedefs';

const EndPoll = props => {
  const [pollend] = useMutation(END_POLL, {
    onCompleted: () => {
      navigate('/dashboard');
    },
  });

  // const { yes, no } = props;
  const endVote = () => {
    // Add end vote logic here
    const forTheMotion = props.yes;
    const againstTheMotion = props.no;
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
    } else if (difference < 0) {
      Swal.fire({
        icon: 'error',
        title: 'Motion Failed',
        html: `For the motion : ${forTheMotion}<br>Against the motion : ${againstTheMotion}`,
        confirmButtonText: 'OK',
        confirmButtonColor: 'red',
        backdrop: 'rgba(253, 176, 176, 0.553)',
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Tie',
        html: `For the motion : ${forTheMotion}<br>Against the motion : ${againstTheMotion}`,
        confirmButtonText: 'OK',
        confirmButtonColor: 'gray',
        backdrop: 'rgba(253, 253, 185, 0.637)',
      });
    }

    pollend({ variables: { pollId: props.id } });
  };

  return (
    <button className="end" type="button" onClick={endVote}>
      End Vote
    </button>
  );
};
EndPoll.propTypes = {
  yes: PropTypes.number,
  no: PropTypes.number,
  id: PropTypes.number,
};
EndPoll.defaultProps = {
  yes: 0,
  no: 0,
  id: 0,
};
export default EndPoll;
