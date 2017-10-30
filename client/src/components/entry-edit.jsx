import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EditEntryView from './edit-entry-view';
import EditEntryLiveView from './edit-entry-live-view';

import '../styles/entry.css';

export default class EntryEdit extends Component {
  static propTypes = {
    version: PropTypes.object,
    action: PropTypes.func,
    cancel: PropTypes.func,
    error: PropTypes.object,
    isEdit: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.state = {
      textBody: this.getTextBody(),
      title: this.getTitle(),
      editReason: '',
      height: 0,
      width: 0,
      isLiveView: false,
    };
  }

  getTextBody() {
    if (!this.props.version) return '';
    return this.props.version.textBody;
  }

  getTitle() {
    if (!this.props.version) return '';
    return this.props.version.title;
  }

  onChange(e) {
    this.setState({ textBody: e.target.value });
  }
  onChangeTitle(e) {
    this.setState({ title: e.target.value });
  }

  onChangeEditReason(e) {
    this.setState({ editReason: e.target.value });
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions.bind(this));
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  toggleLiveView() {
    this.setState({ ...this.state, isLiveView: !this.state.isLiveView });
  }

  submit() {
    const version = this.props.version || null;
    const submission = {
      ...version,
      title: this.state.title,
      textBody: this.state.textBody,
      reasonModified: this.state.editReason,
    };
    this.props.action(submission);
  }

  render() {
    const isOnlyLiveView = this.state.isLiveView && this.state.width < 770;

    if (isOnlyLiveView) {
      return (
        <EditEntryLiveView
          title={this.state.title}
          textBody={this.state.textBody}
          setTextBody={this.onChange.bind(this)}
          toggle={this.toggleLiveView.bind(this)}
          isOnlyLiveView={isOnlyLiveView}
        />
      );
    } else {
      return (
        <div className="create-entry-view">
          <div className="row">
            <EditEntryView
              toggle={this.toggleLiveView.bind(this)}
              version={this.props.version}
              action={this.submit.bind(this)}
              cancel={this.props.cancel}
              title={this.state.title}
              setTitle={this.onChangeTitle.bind(this)}
              textBody={this.state.textBody}
              setTextBody={this.onChange.bind(this)}
              error={this.props.error}
              isEdit={this.props.isEdit}
              editReason={this.state.editReason}
              setEditReason={this.onChangeEditReason.bind(this)}
            />
            <EditEntryLiveView
              title={this.state.title}
              textBody={this.state.textBody}
              toggle={this.toggleLiveView.bind(this)}
              isOnlyLiveView={isOnlyLiveView}
            />
          </div>
        </div>
      );
    }
  }
}
