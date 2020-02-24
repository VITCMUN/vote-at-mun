import React from 'react';
import Swal from 'sweetalert2';
import '../../styling/endButton.css';

const EndPoll = () => {
  const endVote = () => {
    // Add end vote logic here
    const forTheMotion = 20;
    const againstTheMotion = 20;
    const difference = forTheMotion - againstTheMotion;
    if (difference > 0) {
      Swal.fire({
        icon: 'success',
        title: 'Motion Passed',
        html: `For the motion : ${forTheMotion}<br>Against the motion : ${againstTheMotion}`,
        confirmButtonText: 'OK',
        confirmButtonColor: 'green',
        backdrop: 'rgba(188, 245, 188, 0.336)',
        footer: '<a href="/">Go to Dashboard</Link>',
      });
    } else if (difference < 0) {
      Swal.fire({
        icon: 'error',
        title: 'Motion Failed',
        html: `For the motion : ${forTheMotion}<br>Against the motion : ${againstTheMotion}`,
        confirmButtonText: 'OK',
        confirmButtonColor: 'red',
        backdrop: 'rgba(253, 176, 176, 0.553)',
        footer: '<a href="/">Go to Dashboard</Link>',
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Tie',
        html: `For the motion : ${forTheMotion}<br>Against the motion : ${againstTheMotion}`,
        confirmButtonText: 'OK',
        confirmButtonColor: 'gray',
        backdrop: 'rgba(253, 253, 185, 0.637)',
        footer: '<a href="/">Go to Dashboard</Link>',
      });
    }
  };

  return (
    <button className="end" type="button" onClick={endVote}>
      End Vote
    </button>
  );
};

export default EndPoll;
