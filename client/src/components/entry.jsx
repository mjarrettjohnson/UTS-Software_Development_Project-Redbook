import React, { Component } from 'react';
import marked from 'marked';
import ReactHtmlParser from 'react-html-parser';
import ModalWrapper from '../../shared/components/modal';
export default class EntryView extends Component {
  parser = ReactHtmlParser;

  constructor(props) {
    super(props);

    this.state = {
      textBody: '',
    };
  }

  getSelectedVersion() {
    return this.props.version;
  }

  getVersions() {
    return this.props.entry.versions;
  }

  getEntry() {
    return this.props.entry || {};
  }

  isLatestVersion(id) {
    let last = this.props.entry.versions.length - 1;
    let isLatest = false;
    this.props.entry.versions.forEach((version, index) => {
      if (version.id !== id) return;
      if (index === last) isLatest = true;
    });
    return isLatest;
  }

  setEditButton() {
    const id = this.props.version.id;
    const edit = (
      <div className="col-md-1">
        <button className="btn-edit" onClick={e => this.props.toggleView()}>
          <i className="glyphicon glyphicon-pencil" />
        </button>
      </div>
    );

    return this.isLatestVersion(id) && !this.props.entry.isDeleted ? edit : '';
  }

  setDeleteButton() {
    const id = this.props.version.id;
    const deleteButton = (
      <div className="col-md-1">
        <ModalWrapper action={this.props.deleteEntry} cancel="" entry={this.props.entry} />
        {/* <button
          className="btn-delete"
          onClick={e => {
            if (window.confirm('Are you sure you want to delete this entry?\nThis is not reversible.')) {
              this.props.deleteEntry(this.props.entry);
            }
          }}
        >
          <i className="glyphicon glyphicon-trash" />
        </button> */}
      </div>
    );

    return this.isLatestVersion(id) && !this.props.entry.isDeleted ? deleteButton : '';
  }

  setHideButton() {
    const id = this.props.version.id;
    const hideButton = (
      <div className="col-md-1">
        {this.props.entry && this.props.entry.isHidden ? (
          <button
            className="btn-hide"
            onClick={e => {
              if (window.confirm('Are you sure you want to unhide this entry?')) {
                this.props.hideEntry(this.props.entry);
              }
            }}
          >
            <i className="glyphicon  glyphicon glyphicon-check" />
            <br />Unhide
          </button>
        ) : (
          <button
            className="btn-hide"
            onClick={e => {
              if (window.confirm('Are you sure you want to hide this entry?')) {
                this.props.hideEntry(this.props.entry);
              }
            }}
          >
            <i className="glyphicon  glyphicon glyphicon-unchecked" />
            <br />Hide
          </button>
        )}
      </div>
    );

    return this.isLatestVersion(id) && !this.props.entry.isDeleted ? hideButton : '';
  }

  parseTextBody() {
    const version = this.getSelectedVersion();

    if (version && version.textBody) {
      return this.parser(marked(version.textBody));
    }

    return <div>Something went wrong</div>;
  }

  render() {
    return (
      <div className="container entry">
        <div className="row">
          <div className="col-md-9">
            <h1>{this.getSelectedVersion().title}</h1>
          </div>
          {this.setHideButton()}
          {this.setDeleteButton()}
          {this.setEditButton()}
        </div>
        <hr />
        <div className="row">
          <div className="col-md-12">{this.parseTextBody()}</div>
        </div>
      </div>
    );
  }
}
