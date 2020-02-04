import React, { useState } from 'react';
import '../../styling/admindashboard.css';

function AdminDashboard() {
  const [renderView, setRenderView] = useState(0);
  const [addUserState, setaddUserState] = useState({ name: '', email: '' });
  const [deleteUserState, setdeleteUserState] = useState({ name: '', uid: '' });
  const [, , setchooseBannerState] = useState({ banner: '1' });

  function addUserFormHandler(event) {
    event.preventDefault();
    setRenderView(0);
  }

  function deleteUserFormHandler(event) {
    event.preventDefault();
    setRenderView(0);
  }

  function chooseBannerFormHandler(event) {
    event.preventDefault();
    setRenderView(0);
  }

  const chooseRender = (
    <>
      <div
        className="optionbutton"
        onClick={() => setRenderView(1)}
        onKeyDown={event => {
          if (event.keycode === 13) setRenderView(1);
        }}
        role="button"
        tabIndex="0"
      >
        <p className="optiontext">Add User</p>
      </div>
      <div
        className="optionbutton"
        onClick={() => setRenderView(2)}
        onKeyDown={event => {
          if (event.keycode === 13) setRenderView(2);
        }}
        role="button"
        tabIndex="0"
      >
        <p className="optiontext">Delete User</p>
      </div>
      <div
        className="optionbutton"
        onClick={() => setRenderView(3)}
        onKeyDown={event => {
          if (event.keycode === 13) setRenderView(3);
        }}
        role="button"
        tabIndex="0"
      >
        <p className="optiontext">Choose Banner</p>
      </div>
    </>
  );

  const addUser = (
    <>
      <form className="adduserform">
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          value={addUserState.name}
          onChange={event =>
            setaddUserState({
              name: event.target.value,
              email: addUserState.email,
            })
          }
        />
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          name="email"
          id="email"
          required
          value={addUserState.email}
          onChange={event =>
            setaddUserState({
              name: addUserState.name,
              email: event.target.value,
            })
          }
        />
        <div
          className="submit"
          onClick={event => addUserFormHandler(event)}
          onKeyDown={event => {
            if (event.keycode === 13) addUserFormHandler(event);
          }}
          role="button"
          tabIndex="0"
        >
          <p className="submittext">Submit</p>
        </div>
        <div
          className="goback"
          onClick={() => setRenderView(0)}
          onKeyDown={event => {
            if (event.keycode === 13) setRenderView(0);
          }}
          role="button"
          tabIndex="0"
        >
          <p className="submittext">Go Back</p>
        </div>
      </form>
    </>
  );

  const deleteUser = (
    <>
      <form className="deleteuserform">
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          value={deleteUserState.name}
          onChange={event =>
            setdeleteUserState({
              name: event.target.value,
              uid: deleteUserState.uid,
            })
          }
        />
        <label htmlFor="uid">Id: </label>
        <input
          type="text"
          name="uid"
          id="uid"
          required
          value={deleteUserState.uid}
          onChange={event =>
            setdeleteUserState({
              name: deleteUserState.name,
              uid: event.target.value,
            })
          }
        />
        <div
          className="submit"
          onClick={event => deleteUserFormHandler(event)}
          onKeyDown={event => {
            if (event.keycode === 13) deleteUserFormHandler(event);
          }}
          role="button"
          tabIndex="0"
        >
          <p className="submittext">Submit</p>
        </div>
        <div
          className="goback"
          onClick={() => setRenderView(0)}
          onKeyDown={event => {
            if (event.keycode === 13) setRenderView(0);
          }}
          role="button"
          tabIndex="0"
        >
          <p className="submittext">Go Back</p>
        </div>
      </form>
    </>
  );

  const chooseBanner = (
    <>
      <form className="choosebannerform">
        <label htmlFor="countryselect">Country: </label>
        <select
          id="countryselect"
          className="select"
          onChange={event =>
            setchooseBannerState({ banner: event.target.value })
          }
        >
          <option className="option" value="1">
            Option1
          </option>
          <option className="option" value="2">
            Option2
          </option>
          <option className="option" value="3">
            Option3
          </option>
          <option className="option" value="4">
            Option4
          </option>
        </select>
        <div
          className="submit"
          onClick={event => chooseBannerFormHandler(event)}
          onKeyDown={event => {
            if (event.keycode === 13) chooseBannerFormHandler(event);
          }}
          role="button"
          tabIndex="0"
        >
          <p className="submittext">Submit</p>
        </div>
        <div
          className="goback"
          onClick={() => setRenderView(0)}
          onKeyDown={event => {
            if (event.keycode === 13) setRenderView(0);
          }}
          role="button"
          tabIndex="0"
        >
          <p className="submittext">Go Back</p>
        </div>
      </form>
    </>
  );

  let viewToRender;
  if (renderView === 0) viewToRender = chooseRender;
  else if (renderView === 1) viewToRender = addUser;
  else if (renderView === 2) viewToRender = deleteUser;
  else if (renderView === 3) viewToRender = chooseBanner;

  // headlogo needs an image
  return (
    <div className="admincontainer">
      <div className="pageheader">
        <div className="headlogo">
          <img alt="logo" src="" height="200" width="200" />
        </div>
        <div className="headtitle">
          <p>Admin Dashboard</p>
        </div>
      </div>
      <div className="pagecontent">{viewToRender}</div>
    </div>
  );
}

export default AdminDashboard;
