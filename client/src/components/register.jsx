import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hashHistory } from 'react-router';
import validate from '../utils/validation';
import * as handle from '../utils/forms';

import Form from '../components/form';

export default class Register extends Component {
  static propTypes = {
    register: PropTypes.func,
    error: PropTypes.object,
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
        label: 'First Name',
        name: 'firstname',
        value: '',
        validate: validate.firstname,
        valid: true,
        error: 'That is not a valid First Name',
      },
      {
        label: 'Last Name',
        name: 'lastname',
        value: '',
        validate: validate.lastname,
        valid: true,
        error: 'That is not a valid Last Name',
      },

      {
        label: 'Username',
        name: 'username',
        value: '',
        validate: validate.lastname,
        valid: true,
        error: 'That is not a valid Username',
      },
      {
        label: 'Email',
        name: 'email',
        value: '',
        validate: validate.email,
        valid: true,
        error: 'That is not a valid Email',
      },
      {
        label: 'Password',
        name: 'password',
        value: '',
        type: 'password',
        validate: validate.password,
        valid: true,
        error: 'Password must be at least 6 characters long and contain at least 1 number.',
      },
      {
        label: 'Repeat Password',
        name: 'passwordCheck',
        value: '',
        type: 'password',
        validate: validate.password,
        valid: true,
      },
    ];
  }

  goToLoginPage() {
    hashHistory.push('/login');
  }

  render() {
    return (
      <div className="" style={{ minHeight: '100%' }}>
        <div className="">
          <div className="col-md-6 right-border">
            <a href="/#/login">
              <h2 className="logo-heading">Redbook</h2>
            </a>
          </div>
          <div className="col-md-6 register-container">
            <Form
              elements={this.state.elements}
              handleChange={e => {
                this.handleChange(e);
              }}
              handleSubmit={e => {
                this.handleSubmit(e, this.props.register);
              }}
              error={this.props.error}
              title="Register"
              cancel={this.goToLoginPage}
            />
          </div>
        </div>
      </div>
    );
  }
}
