import React, { Component } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import PropTypes from 'prop-types';
import 'react-day-picker/lib/style.css';

export default class Search extends Component {
  static propTypes = {
    action: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      query: {
        from: '',
        to: '',
      },
      hasErrors: false,
    };
  }

  setFromDate(date) {
    this.setState({ ...this.state, query: { ...this.state.query, from: date._d } });
  }

  setUntilDate(date) {
    this.setState({ ...this.state, query: { ...this.state.query, to: date._d } });
  }

  setFromClass() {
    if (!this.state.query.from && this.state.hasErrors) return `form-group has-error`;
    return 'form-group';
  }

  setToClass(newClass = '') {
    if (!this.state.query.to && this.state.hasErrors) return `form-group has-error`;
    return 'form-group';
  }

  setFromError() {
    if (!this.state.query.from && this.state.hasErrors) return 'Please select a starting date';
  }

  setToError() {
    if (!this.state.query.to && this.state.hasErrors) return 'Please select a ending date';
  }

  submit(e) {
    e.preventDefault();
    if (this.state.query.from && this.state.query.to) this.props.action(this.state.query);
    else this.setState({ ...this.state, hasErrors: true });
  }

  render() {
    return (
      <div className="">
        <div className="row">
          <div className="col-md-12 text-center">
            <h3 style={{ color: 'white' }}>Search Entries by Date</h3>
          </div>
        </div>

        <form style={{ marginTop: '10%' }} className="text-center">
          <div className={this.setFromClass()}>
            <div className="col-sm-12 col-md-6 col-md-offset-3">
              <label className="">From</label>
              <DayPickerInput className="form-control" onDayChange={this.setFromDate.bind(this)} />
              <span className="help-block">{this.setFromError()}</span>
            </div>
          </div>
          <div className={this.setToClass()}>
            <div className="col-sm-12  col-md-6 col-md-offset-3">
              <label className=" ">To</label>
              <DayPickerInput className="form-control" onDayChange={this.setUntilDate.bind(this)} />
              <span className="help-block">{this.setToError()}</span>
            </div>
          </div>
          <div style={{ marginTop: '18px' }} className="form-group col-sm-12  col-md-6 col-md-offset-3">
            <button onClick={e => this.submit(e)} className="form-control">
              Search
            </button>
          </div>
        </form>
      </div>
    );
  }
}
