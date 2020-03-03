import React, { useState } from 'react';
import '../../styling/EBPoll.css';
import { navigate } from '@reach/router';
import Swal from 'sweetalert2';
import { useMutation, useQuery } from 'react-apollo';
import { CountryFlags } from '../Common/CountryFlags';
import Navbar from '../Common/Navbar';
import { CountryNames as CN } from '../../constants/CountryNames';
import { ADD_POLL, GET_DELEGATES } from '../../typedefs';
import LoadingScreen from '../Common/LoadingScreen.jsx';

const EBPoll = () => {
  // Initial State of the poll form
  const [pollForm, updatePollForm] = useState({
    agenda: '',
    totalSpeakerTime: '',
    description: 'Moderated Caucus',
    raisedBy: '',
    countries: '',
    twoThirdsMajority: 'false',
  });

  const [requiredError, updateError] = useState('');

  const [selected, setSelected] = useState([]);

  const { loading, error, data } = useQuery(GET_DELEGATES);
  const CountryPresent = [];
  CN.forEach(country => {
    if (!loading && data.getDelegates.includes(country.name)) {
      CountryPresent.push(country);
    }
  });
  const CountryNames = CountryPresent;

  // The below functions are used to manage the state of the form
  const handleInputChange = event => {
    event.preventDefault();
    updateError('');
    const { name, value } = event.target;
    updatePollForm({ ...pollForm, [name]: value });
  };
  const [addpoll] = useMutation(ADD_POLL, {
    onCompleted: data1 => {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Poll Created',
        confirmButtonText: 'Poll Created',
        confirmButtonColor: 'green',
      });
      navigate('/result', {
        state: {
          data: { pollId: data1.addPoll, pollType: pollForm.twoThirdsMajority },
        },
      });
    },
  });
  const handleSubmit = event => {
    event.preventDefault();
    if (!(pollForm.agenda.length > 0 && pollForm.description.length > 0)) {
      updateError('Please fill out all the fields');
      return;
    }
    try {
      event.preventDefault();
      const majority = pollForm.twoThirdsMajority === 'true';
      addpoll({
        variables: {
          title: pollForm.agenda,
          description: pollForm.description,
          totalSpeakerTime: Number(pollForm.totalSpeakerTime),
          raisedBy: pollForm.raisedBy,
          username: selected,
          twoThirdsMajority: majority,
        },
      });
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

  const getCountries = () => {
    const arr = CountryNames.map(obj => (
      <option key={obj.name} value={obj.name}>
        {obj.name}
      </option>
    ));
    return arr;
  };

  if (loading) return <LoadingScreen />;
  if (error) return <p> An error occurred </p>;

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
                  <label htmlFor="textinp">Motion Raised</label>
                  <input
                    type="text"
                    name="agenda"
                    value={pollForm.agenda}
                    id="textinp"
                    onChange={handleInputChange}
                  />
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
                  <label htmlFor="description">Type of Motion Raised</label>
                  <select
                    name="description"
                    value={pollForm.description}
                    onChange={handleInputChange}
                    id="description"
                    className="selectField"
                  >
                    <option value="Moderated Caucus">Moderated Caucus</option>
                    <option value="Unmoderated Caucus">
                      Unmoderated Caucus
                    </option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="raisedBy">Raised By</label>
                  <select
                    name="raisedBy"
                    value={pollForm.raisedBy}
                    onChange={handleInputChange}
                    id="raisedBy"
                    className="selectField"
                  >
                    <option value="">------------------</option>
                    {getCountries()}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="description">Type of Voting</label>
                  <select
                    name="twoThirdsMajority"
                    value={pollForm.twoThirdsMajority}
                    onChange={handleInputChange}
                    id="twoThirdsMajority"
                    className="selectField"
                  >
                    <option value="false">Simple Majority</option>
                    <option value="true">Two-Third Majority</option>
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
