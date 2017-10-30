import React, { Component } from 'react';
import validate from '../utils/validation';

import Form from '../components/form';
import '../styles/dashboard.css';
import * as handle from '../utils/forms';

import PropTypes from 'prop-types';

export default class CreateJournalForm extends Component {
  static propTypes = {
    action: PropTypes.func,
    error: PropTypes.object,
    cancel: PropTypes.func,
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
        label: 'Title',
        name: 'name',
        value: '',
        validate: validate.notEmptyAndLessThanFiftyCharacters,
        valid: true,
        error: 'Title Must be empty and must be less than 20 characters',
      },
    ];
  }

  render() {
    return (
      <div>
        <div className="create-journal-container">
          <div className="body-container col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-8 col-xs-offset-2 create-journal-div">
            <Form
              elements={this.state.elements}
              handleChange={e => {
                this.handleChange(e);
              }}
              handleSubmit={e => {
                this.handleSubmit(e, this.props.action);
              }}
              title="Create New Journal"
              error={this.props.error || {}}
              cancel={this.props.cancel}
            />
          </div>
        </div>
        <div className="color-block" />
      </div>
    );
  }
}
