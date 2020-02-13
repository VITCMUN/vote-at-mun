import React, { useState } from 'react';
import { Mutation } from '@apollo/react-components';
import { ADD_USER, REMOVE_USER, SET_COUNCIL } from '../../typedefs';
import '../../styling/admindashboard.css';

function AdminDashboard() {
  const [renderView, setRenderView] = useState(0);
  const [addUserState, setaddUserState] = useState({
    username: null,
    password: null,
    userType: 0,
    profilePicUrl: null,
    stance: 0,
    observer: false,
  });
  const [deleteUserState, setdeleteUserState] = useState({ username: '' });
  const [councilState, setCouncilState] = useState({
    bannerUrl: null,
    name: null,
  });

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
    <Mutation mutation={ADD_USER}>
      {addUserM => (
        <>
          <form
            className="adduserform"
            onSubmit={e => {
              e.preventDefault();
              const {
                username,
                password,
                userType,
                profilePicUrl,
                stance,
                observer,
              } = addUserState;
              addUserM({
                variables: {
                  username,
                  password,
                  userType,
                  profilePicUrl,
                  stance,
                  observer,
                },
              });
              setRenderView(0);
            }}
          >
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              name="username"
              id="username"
              required
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
              onChange={event =>
                setaddUserState(
                  Object.assign(addUserState, {
                    password: event.target.value,
                  })
                )
              }
            />
            <br />
            <label htmlFor="userType">User Type: </label>
            <select
              name="userType"
              id="userType"
              required
              onChange={event =>
                setaddUserState(
                  Object.assign(addUserState, {
                    userType: parseInt(event.target.value, 10),
                  })
                )
              }
            >
              <option value="0">Delegate</option>
              <option value="1">EB</option>
              <option value="2">Admin</option>
            </select>
            <br />
            <label htmlFor="profilePicUrl">Profile Pic URL: </label>
            <input
              type="text"
              name="profilePicUrl"
              id="profilePicUrl"
              onChange={event =>
                setaddUserState(
                  Object.assign(addUserState, {
                    profilePicUrl: parseInt(event.target.value, 10),
                  })
                )
              }
            />
            <br />
            <label htmlFor="stance">Stance: </label>
            <select
              name="stance"
              id="stance"
              required
              onChange={event =>
                setaddUserState(
                  Object.assign(addUserState, {
                    stance: event.target.value,
                  })
                )
              }
            >
              <option value="0">Present</option>
              <option value="1">Present and Voting</option>
            </select>
            <br />
            <label htmlFor="observer">Not Observer: </label>
            <input
              type="radio"
              name="observer"
              id="observer"
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
              onChange={() =>
                setaddUserState(
                  Object.assign(addUserState, {
                    observer: true,
                  })
                )
              }
            />
            <button className="submit" type="submit">
              Submit
            </button>
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
      )}
    </Mutation>
  );

  const deleteUser = (
    <Mutation mutation={REMOVE_USER}>
      {removeUser => (
        <>
          <form
            className="deleteuserform"
            onSubmit={e => {
              e.preventDefault();
              removeUser({
                variables: { username: deleteUserState.username },
              });
              setRenderView(0);
            }}
          >
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              name="username"
              id="username"
              required
              value={deleteUserState.username}
              onChange={event =>
                setdeleteUserState({
                  username: event.target.value,
                })
              }
            />
            <button type="submit" className="submit" tabIndex="0">
              <p className="submittext">Submit</p>
            </button>
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
      )}
    </Mutation>
  );

  const setCouncil = (
    <Mutation mutation={SET_COUNCIL}>
      {setCouncilM => (
        <>
          <form
            className="choosebannerform"
            onSubmit={e => {
              e.preventDefault();
              setCouncilM({
                variables: {
                  name: councilState.name,
                  bannerUrl: councilState.bannerUrl,
                },
              });
              setRenderView(0);
            }}
          >
            <label htmlFor="councilName">Council Name</label>
            <input
              type="text"
              name="name"
              id="councilName"
              required
              onChange={event =>
                setCouncilState(
                  Object.assign(councilState, {
                    name: event.target.value,
                  })
                )
              }
            />
            <label htmlFor="bannerUrl">Banner URL</label>
            <input
              type="text"
              name="bannerUrl"
              id="bannerUrl"
              required
              onChange={event =>
                setCouncilState(
                  Object.assign(councilState, {
                    bannerUrl: event.target.value,
                  })
                )
              }
            />
            <button className="submit" type="submit" tabIndex="0">
              <p className="submittext">Submit</p>
            </button>
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
      )}
    </Mutation>
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
