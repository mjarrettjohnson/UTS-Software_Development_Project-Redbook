import React, { Component } from 'react';
import validate from '../utils/validation';

import Form from '../components/form';

import * as handle from '../utils/forms';
import PropTypes from 'prop-types';

export default class Login extends Component {
  static propTypes = {
    login: PropTypes.func,
  };

  constructor() {
    super();

    this.state = {
      elements: this.createElements(),
    };

    this.handleChange = handle.change.bind(this);
    this.handleSubmit = handle.submit.bind(this);
  }
  createElements() {
    return [
      {
        label: 'Username',
        name: 'username',
        value: '',
        validate: validate.notEmpty,
        valid: true,
        error: 'Username cannot be empty',
      },
      {
        label: 'Password',
        name: 'password',
        value: '',
        valid: true,
        type: 'password',
        validate: validate.notEmpty,
        error: 'Password cannot be empty',
      },
    ];
  }

  render() {
    return (
      <div className="" style={{ minHeight: '100%' }}>
        <div className="">
          <div className="col-md-6 right-border">
            <h2 className="logo-heading">Redbook</h2>
          </div>
          <div className="col-md-6 login-container">
            <Form
              elements={this.state.elements}
              handleChange={e => {
                this.handleChange(e);
              }}
              handleSubmit={e => {
                this.handleSubmit(e, this.props.login);
              }}
              title="Login"
              error={this.props.error}
            />
            <div className="register-msg-container">
              <span className="register-msg">
                Don't have a login...? Sign up <a href="/#/register">here!</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
