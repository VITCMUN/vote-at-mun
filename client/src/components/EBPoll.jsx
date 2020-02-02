/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import '../styling/EBPoll.css';
import Sidebar from './Sidebar';
import { CountryFlags } from './CountryFlags';

const EBPoll = () => {
  // Initial State of the poll form
  const [pollForm, updatePollForm] = useState({
    agenda: '',
    type: '',
    totalSpeakerTime: '',
    description: '',
    raisedBy: '',
    countries: '',
  });

  const [selected, setSelected] = useState([]);

  // The below functions are used to manage the state of the form

  const handleInputChange = event => {
    const { name, value } = event.target;
    updatePollForm({ ...pollForm, [name]: value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    // TODO : Add path to mutation call
  };

  // To escape the ' character
  const heading = "EXECUTIVE BOARD'S DASHBOARD";

  return (
    <div className="resolution">
      <div className="App">
        <div>
          <div>
            <Sidebar />
          </div>
          <img className="img2" src="mun.png" />
          <h4 className="EB">
            <b>{heading}</b>
          </h4>
          <br />
          <div className="div1">
            <CountryFlags selected={selected} setSelected={setSelected} />
          </div>
          <br />
          <button type="button" className="button" id="join">
            <b>SELECT COUNTRIES TO BROADCAST</b>
          </button>
          <form className="Appp" onSubmit={handleSubmit}>
            <h1>
              <span className="font-weight-bold head">POLL FORM</span>
            </h1>
            <br />
            <label className="agendaLabel">
              <b>Agenda</b>
            </label>
            <div className="input">
              <input
                type="text"
                onChange={handleInputChange}
                value={pollForm.agenda}
                name="agenda"
                className="no-outline"
              />
            </div>
            <br />
            <label className="typeLabel">
              <b>Type</b>
            </label>
            <br />
            <div className="input">
              <input
                type="text"
                value={pollForm.type}
                onChange={handleInputChange}
                name="type"
                className="no-outline"
              />
            </div>
            <br />
            <br />
            <div className="tst">
              <label className="totalSpeakerTimeLabel">
                <b>Total Speaker Time</b>
              </label>
              <br />
            </div>
            <div className="input">
              <input
                type="number"
                value={pollForm.totalSpeakerTime}
                onChange={handleInputChange}
                name="totalSpeakerTime"
                className="no-outline"
              />
            </div>
            <br />
            <br />
            <label className="descriptionLabel">
              <b>Description</b>
            </label>
            <br />
            <div className="input">
              <input
                type="text"
                value={pollForm.description}
                onChange={handleInputChange}
                name="description"
                className="no-outline"
              />
            </div>
            <br />
            <br />
            <label className="raisedByLabel">
              <b>Raised by</b>
            </label>
            <br />
            <div className="input">
              <input
                type="text"
                value={pollForm.raisedBy}
                onChange={handleInputChange}
                name="raisedBy"
                className="no-outline"
              />
            </div>

            <br />
            <div id="menuBall1" className="menuBall">
              <a
                href="https://vitcmun.in/"
                onClick={handleSubmit}
                className="ball blueball"
              >
                <div className="menuText">
                  <b> CREATE</b>
                </div>
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EBPoll;
