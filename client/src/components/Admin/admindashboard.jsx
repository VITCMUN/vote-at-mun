import React, { useState } from 'react';
import '../../styling/admindashboard.css';

function AdminDashboard() {
  const [renderView, setRenderView] = useState(0);
  const [addUserState, setaddUserState] = useState({
    username: '',
    password: '',
    user_type: '',
    profile_pic_url: '',
    stance: '',
    observer: '',
  });
  const [deleteUserState, setdeleteUserState] = useState({ name: '', uid: '' });
  const [councilState, setCouncilState] = useState({ cname: '', banner_url: '' });

  function addUserFormHandler(event) {
    event.preventDefault();
    setRenderView(0);
  }

  function deleteUserFormHandler(event) {
    event.preventDefault();
    setRenderView(0);
  }

  function setCouncilFormHandler(event) {
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
        <p className="optiontext">Set Council</p>
      </div>
    </>
  );

  const addUser = (
    <>
      <form className="adduserform">
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          name="username"
          id="username"
          required
          // value={addUserState.username}
          onChange={event =>
            setaddUserState(
              Object.assign(addUserState, {
                username: event.target.value,
              })
            )
          }
        />
        <br />
        <label htmlFor="password">Password: </label>
        <input
          type="text"
          name="password"
          id="password"
          required
          // value={addUserState.password}
          onChange={event =>
            setaddUserState(
              Object.assign(addUserState, {
                password: event.target.value,
              })
            )
          }
        />
        <br />
        <label htmlFor="user_type">User Type: </label>
        <select
          id="user_type"
          className="select"
          onChange={event =>
            setaddUserState(
              Object.assign(addUserState, {
                user_type: event.target.value,
              })
            )
          }
        >
          <option className="option" value="0">
            Delegate
          </option>
          <option className="option" value="1">
            EB
          </option>
          <option className="option" value="2">
            Admin
          </option>
        </select>
        <br />
        <label htmlFor="profile_pic_url">Profile Pic URL: </label>
        <input
          type="text"
          name="profile_pic_url"
          id="profile_pic_url"
          required
          // value={addUserState.profile_pic_url}
          onChange={event =>
            setaddUserState(
              Object.assign(addUserState, {
                profile_pic_url: event.target.value,
              })
            )
          }
        />
        <br />
        <label htmlFor="stance">Stance: </label>
        <select
          id="stance"
          className="select"
          onChange={event =>
            setaddUserState(
              Object.assign(addUserState, {
                stance: event.target.value,
              })
            )
          }
        >
          <option className="option" value="0">
            Present
          </option>
          <option className="option" value="1">
            Present And Voting
          </option>
        </select>
        <br />
        <label htmlFor="observer">Not Observer: </label>
        <input
          type="radio"
          name="observer"
          id="observer"
          required
          // value={addUserState.stance}
          onChange={() =>
            setaddUserState(
              Object.assign(addUserState, {
                observer: false,
              })
            )
          }
        />
        <span />
        <label htmlFor="observer">Observer: </label>
        <input
          type="radio"
          name="observer"
          id="observertwo"
          required
          // value={addUserState.stance}
          onChange={() =>
            setaddUserState(
              Object.assign(addUserState, {
                observer: true,
              })
            )
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
        <br />
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

  const setCouncil = (
    <>
      <form className="setCouncilform">
        <label htmlFor="cname">Council Name: </label>
        <input
          type="text"
          name="cname"
          id="cname"
          required
          onChange={event =>
            setCouncilState(
              Object.assign(councilState, {
                cname: event.target.value,
              })
            )
          }
        />
        <br />
        <label htmlFor="banner_url">Council Banner URL: </label>
        <input
          type="text"
          name="banner_url"
          id="banner_url"
          required
          onChange={event =>
            setCouncilState(
              Object.assign(councilState, {
                banner_url: event.target.value,
              })
            )
          }
        />
        <div
          className="submit"
          onClick={event => setCouncilFormHandler(event)}
          onKeyDown={event => {
            if (event.keycode === 13) setCouncilFormHandler(event);
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
  else if (renderView === 3) viewToRender = setCouncil;

  // headlogo needs an image
  return (
    <div className="admincontainer">
      <div className="pageheader">
        <div className="headlogo">
          <img alt="logo" src="img/mun.png" height="150" width="200" />
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
