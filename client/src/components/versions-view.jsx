import React, { Component } from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import ReactHtmlParser from 'react-html-parser';

import DateFormatter from '../utils/date-formatter';

import '../styles/version.css';

export default class VersionsView extends Component {
  parser = ReactHtmlParser;
  weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  static propTypes = {
    current: PropTypes.object, // entry
    hideEntry: PropTypes.func,
    deleteEntry: PropTypes.func,
    toggleAuthorIsEditingEntry: PropTypes.func,
    selectVersionById: PropTypes.func,
    selectedVersion: PropTypes.object,
    versions: PropTypes.array,
  };

  constructor(props) {
    super(props);
    this.state = {
      version: this.props.selectedVersion,
    };
  }

  componentDidMount() {
    this.setState({ version: this.props.selectedVersion, isViewingEntry: true });
  }

  isHistory() {
    return window.location.href.split('/')[4] === 'history';
  }

  setEditButton(version) {
    const entry = this.props.current;
    const isDisabled = entry.versions.indexOf(version) !== entry.versions.length - 1;

    const edit = (
      <button disabled={isDisabled} onClick={e => this.props.toggleAuthorIsEditingEntry()}>
        <i className="glyphicon glyphicon-pencil" />
      </button>
    );
    return isDisabled || this.isHistory() ? '' : edit;
  }

  parseTextBody(textBody) {
    try {
      if (textBody) {
        return this.parser(marked(textBody));
      }
    } catch (e) {
      return <div>Something went wrong</div>;
    }
  }

  getTime(dateStr) {
    const date = new Date(dateStr);
    return date.getHours() + ':' + date.getMinutes() + ':';
  }

  getDayAndTime(dateStr) {
    const date = new Date(dateStr);
    const day = this.weekdays[date.getDay()];
    return `${day}, ${this.getTime(dateStr)}`;
  }

  selectVersion(version) {
    this.props.selectVersionById(version.id);
    this.setState({ version, isViewingEntry: true });
  }

  goToListView() {
    this.setState({ ...this.state, isViewingEntry: false });
  }

  isLatestVersion(version) {
    const lastVersion = this.props.current.versions[this.props.current.versions.length - 1];
    return version.id === lastVersion.id;
  }

  setTileClass(version) {
    if (!this.isLatestVersion(version)) return 'tile col-md-3 col-sm-5 col-xs-5 version-tile';
    return 'tile col-md-3 col-sm-5 col-xs-5 version-tile latest-version';
  }

  render() {
    if (!this.state.isViewingEntry) {
      return (
        <div className="">
          <div className="tile-container">
            <div className="row">
              {this.props.versions.map(version => (
                <div onClick={e => this.selectVersion(version)} className={this.setTileClass(version)}>
                  <div className="text-center">
                    <h2>
                      <small>{DateFormatter.getLongDateString(new Date(version.createdAt))}</small>
                    </h2>
                    <hr />
                  </div>

                  <div className="version">{this.parseTextBody(version.textBody)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    } else {
      const version = this.props.selectedVersion;
      if (!version) return <div>No Version in the state</div>;

      return (
        <div className="version-view-container">
          <div className="container">
            <div className="row">
              <div className="col-md-12 version-view ">
                <div className="pull-right  showopacity btn-panel" style={{ right: '11px' }}>
                  {this.setEditButton(version)}
                  <button onClick={this.goToListView.bind(this)}>
                    <i className="fa fa-reply" />
                  </button>
                </div>
                <div className=" col-md-11 col-sm-10 text-center">
                  <h2>
                    {version.title} -  <small> {DateFormatter.getLongDateString(new Date(version.createdAt))}</small>
                  </h2>
                </div>

                <div className="live-view full-width">{this.parseTextBody(version.textBody)}</div>
                <hr />
                <div className="col-md-12 reason-modified">Reason Modified: {version.reasonModified}</div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
