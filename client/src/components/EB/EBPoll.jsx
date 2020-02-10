import React, { useState } from 'react';
import '../../styling/EBPoll.css';
import { navigate } from '@reach/router';
import Swal from 'sweetalert2';
import { CountryFlags } from '../Common/CountryFlags';
import Navbar from '../Common/Navbar';
import { CountryNames } from '../../constants/CountryNames';

const EBPoll = () => {
  // Initial State of the poll form
  const [pollForm, updatePollForm] = useState({
    agenda: '',
    type: '0',
    totalSpeakerTime: '0',
    description: '',
    raisedBy: '',
    countries: '',
  });

  const [selected, setSelected] = useState([]);

  // The below functions are used to manage the state of the form
  const handleInputChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    updatePollForm({ ...pollForm, [name]: value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    try {
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
                    onInput={handleInputChange}
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
            <CountryFlags selected={selected} setSelected={setSelected} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EBPoll;
