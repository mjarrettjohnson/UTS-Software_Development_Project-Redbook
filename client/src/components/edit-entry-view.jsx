import React, { Component } from 'react';
import PropTypes from 'prop-types';
import validate from '../utils/validation';

export default class EntryEditView extends Component {
  static propTypes = {
    error: PropTypes.object,
    toggle: PropTypes.func,
    title: PropTypes.string,
    setTitle: PropTypes.func,
    textBody: PropTypes.string,
    setTextBody: PropTypes.string,
    editReason: PropTypes.string,
    setEditReason: PropTypes.func,
    action: PropTypes.func,
    cancel: PropTypes.func,
    isEdit: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {
      error: '',
      titleError: '',
      textBodyError: '',
    };
  }

  getError() {
    if (!this.props.error) return '';
    return this.props.error.body;
  }

  setTitle() {
    return this.props.isEdit ? 'Edit Entry' : 'Create Entry';
  }

  setEditReasonInput() {
    if (this.props.isEdit) {
      return (
        <div className="col-md-12">
          <label>Reason Modified</label>

          <input
            onChange={this.props.setEditReason}
            value={this.props.editReason}
            className="form-control edit-title"
            placeholder="Enter Reason Modified"
          />
          <div className="has-error">
            <span className="help-block has-error">{this.state.error}</span>
          </div>
        </div>
      );
    }
  }

  submit() {
    if (this.props.editReason || !this.props.isEdit) this.props.action();
    else {
      this.setState({ error: 'Please Enter a reason why you are modifying this entry' });
    }
  }

  validateTitle() {
    return validate.lessThanFiftyCharacters(this.props.title);
  }

  validateTextBody() {
    return validate.lessThanTenThousandCharacters(this.props.textBody);
  }

  setTitleClass() {
    let titleClass = 'col-md-12';
    if (!this.validateTitle()) {
      titleClass += ' has-error';
    }
    return titleClass;
  }

  setTitleError() {
    if (this.validateTitle()) return;
    return <span className="help-block">An entry title must be less than 50 characters.</span>;
  }

  setTextBodyClass() {
    let bodyClass = 'col-md-12';
    if (!this.validateTextBody()) {
      bodyClass += ' has-error';
    }
    return bodyClass;
  }

  setTextBodyError() {
    if (this.validateTextBody()) return;
    return <span className="help-block">An entry text body must be less than 2000 characters.</span>;
  }

  render() {
    let error = '';
    if (this.getError()) {
      error = (
        <div className="col-md-12 has-error">
          <span className="help-block has-error">{this.getError()}</span>
        </div>
      );
    }

    return (
      <div className=" col-md-6 col-sm-6 col-xs-6 entry">
        <div className="row">
          <div className="col-md-8 col-sm-8 col-xs-8">
            <h1>{this.setTitle()}</h1>
          </div>
          <div className="pull-right hidden-lg hidden-md hidden-sm showopacity">
            <button onClick={this.props.toggle} className="show-live-view">
              <i className="fa fa-exchange " />
            </button>
          </div>
        </div>
        <div className="row">{error}</div>
        <hr />
        <div className="row">
          <div className={this.setTitleClass()}>
            <labe>Title</labe>
            <input
              className="form-control edit-title"
              onChange={this.props.setTitle}
              value={this.props.title}
              placeholder="Enter a Entry Title Here..."
            />
            {this.setTitleError()}
          </div>
        </div>
        <hr />
        <div className="row">
          <div className={this.setTextBodyClass()}>
            <label>Body</label>
            <textarea
              className="form-control edit-body"
              onChange={this.props.setTextBody}
              value={this.props.textBody}
              placeholder="Enter a Entry Body Here..."
            />
            {this.setTextBodyError()}
          </div>
        </div>
        <hr />
        <div className="row">{this.setEditReasonInput()}</div>
        <div className="row">
          <div className="col-md-12 text-center">
            <button
              disabled={!this.validateTitle() || !this.validateTextBody()}
              className="btn-edit"
              onClick={this.submit.bind(this)}
            >
              <i className="glyphicon glyphicon-ok" />
            </button>
            <button className="btn-edit" onClick={() => this.props.cancel()}>
              <i className="glyphicon glyphicon-remove" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}
