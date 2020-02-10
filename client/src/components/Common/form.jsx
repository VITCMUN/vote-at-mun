import React, { Component } from 'react';
import '../../styling/login.css';

export default class LoginForm extends Component {
  constructor() {
    super();
    this.state = { username: '', password: '' };
  }

  onChangeUsername = event => {
    const username = event.target.value;
    this.setState({ username });
  };

  onChangePassword = event => {
    const password = event.target.value;
    this.setState({ password });
  };

  onSubmit = event => {
    event.preventDefault();
    this.props.login({
      variables: {
        username: this.state.username,
        password: this.state.password,
      },
    });
  };

  render() {
    return (
      <div className="login-page">
        <div className="form">
          <form className="login-form" onSubmit={this.onSubmit}>
            <input
              type="text"
              value={this.state.username}
              placeholder="username"
              required
              onChange={this.onChangeUsername}
            />
            <input
              type="password"
              value={this.state.password}
              placeholder="password"
              required
              onChange={this.onChangePassword}
            />
            <button type="submit">login</button>
          </form>
        </div>
      </div>
    );
  }
}
