import React, { useState } from 'react';
import '../../styling/EBPoll.css';
import { navigate } from '@reach/router';
import Swal from 'sweetalert2';
import { useMutation } from 'react-apollo';
import { CountryFlags } from '../Common/CountryFlags';
import Navbar from '../Common/Navbar';
import { CountryNames } from '../../constants/CountryNames';
import { ADD_POLL } from '../../typedefs';

const EBPoll = () => {
  // Initial State of the poll form
  const [pollForm, updatePollForm] = useState({
    agenda: '',

    totalSpeakerTime: '0',
    description: '',
    raisedBy: '',
    countries: '',
  });

  const [requiredError, updateError] = useState('');

  const [selected, setSelected] = useState([]);

  // The below functions are used to manage the state of the form
  const handleInputChange = event => {
    event.preventDefault();
    updateError('');
    const { name, value } = event.target;
    updatePollForm({ ...pollForm, [name]: value });
  };
  const [addpoll] = useMutation(ADD_POLL);
  const handleSubmit = event => {
    event.preventDefault();
    if (!(pollForm.agenda.length > 0 && pollForm.description.length > 0)) {
      updateError('Please fill out all the fields');
      return;
    }

    try {
      event.preventDefault();
      addpoll({
        variables: {
          title: pollForm.agenda,
          description: pollForm.description,

          totalSpeakerTime: Number(pollForm.totalSpeakerTime),
          raisedBy: pollForm.raisedBy,
          username: selected,
        },
      });

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Poll Created',
        confirmButtonText: 'Poll Created',
        confirmButtonColor: 'green',
      });
      navigate('/result');
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err,
        confirmButtonText: 'Try Again',
        confirmButtonColor: 'red',
      });
    }
  };

  const getCountrties = () => {
    return CountryNames.map(obj => (
      <option key={obj.name} value={obj.name}>
        {obj.name}
      </option>
    ));
  };

  return (
    <div className="container">
      <Navbar />
      <div className="form-container">
        <div className="form-component">
          <div className="form-box">
            <form onSubmit={handleSubmit}>
              <h1 className="heading">Create a new Poll</h1>
              <div className="form-fields">
                <div className="field">
                  <p className="error">{requiredError}</p>
                  <label htmlFor="textinp">Agenda</label>
                  <input
                    type="text"
                    name="agenda"
                    value={pollForm.agenda}
                    id="textinp"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="field">
                  <label htmlFor="voteType">Voting Type</label>
                  <select
                    name="type"
                    value={pollForm.type}
                    onChange={handleInputChange}
                    id="voteType"
                    className="selectField"
                  >
                    <option value="0">All not voting</option>
                    <option value="1">All voting</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="totalSpeakerTimeInp">
                    Total Speaker Time (in mins)
                  </label>
                  <input
                    type="number"
                    name="totalSpeakerTime"
                    value={pollForm.totalSpeakerTime}
                    min="0"
                    id="totalSpeakerTimeInp"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="field">
                  <label htmlFor="description">Description</label>
                  <input
                    type="text"
                    name="description"
                    value={pollForm.description}
                    id="description"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="field">
                  <label htmlFor="raisedBy">Raised By</label>
                  <select
                    name="raisedBy"
                    value={pollForm.raisedBy}
                    onChange={handleInputChange}
                    id="raisedType"
                    className="selectField"
                  >
                    {getCountrties()}
                  </select>
                </div>
                <input
                  type="submit"
                  className="submitBtn"
                  onClick={handleSubmit}
                  value="Create"
                />
              </div>
            </form>
          </div>
          <div className="form-flags">
            <h1 className="warning">
              Select the countries <span className="warn">NOT</span> to send the
              poll to
            </h1>
            <CountryFlags selected={selected} setSelected={setSelected} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EBPoll;
