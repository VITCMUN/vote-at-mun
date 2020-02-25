import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../styling/login.css';

class LoginForm extends Component {
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
    const { login } = this.props;
    const { username, password } = this.state;
    login({
      variables: {
        username,
        password,
      },
    });
  };

  render() {
    const { username, password } = this.state;
    return (
      <div className="login-page">
        <div className="form">
          <form className="login-form" onSubmit={this.onSubmit}>
            <input
              type="text"
              value={username}
              placeholder="Enter your Username"
              required
              onChange={this.onChangeUsername}
            />
            <input
              type="password"
              value={password}
              placeholder="Enter your Password"
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

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginForm;
