import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ButtonPanel extends Component {
  static propTypes = {
    current: PropTypes.object, // entry
    deleteEntry: PropTypes.func,
    hideEntry: PropTypes.func,
  };

  isHistory() {
    return window.location.href.split('/')[4] === 'history';
  }

  showAlert(e, message, action) {
    if (window.confirm(message)) {
      action(this.props.current);
    }
  }

  setHideButton() {
    const entry = this.props.current;

    const glyph = entry.isHidden
      ? 'glyphicon  glyphicon glyphicon-eye-open'
      : 'glyphicon  glyphicon glyphicon-eye-close';
    const message = entry.isHidden
      ? 'Are you sure you want to unhide this entry?'
      : 'Are you sure you want to hide this entry?';

    const hide = (
      <button onClick={e => this.showAlert(e, message, this.props.hideEntry)} className="">
        <i id="hide-delete" className={glyph} />
      </button>
    );
    return hide;
  }

  setDeleteButton() {
    const message = 'are you sure you want to delete this entry?\nThis is not reversible.';
    const deleteBtn = (
      <button onClick={e => this.showAlert(e, message, this.props.deleteEntry)} className="">
        <i id="hide-delete" className="glyphicon glyphicon-trash" />
      </button>
    );
    return deleteBtn;
  }

  render() {
    return (
      <div className="pull-right showopacity btn-panel tile-btn-panel">
        {this.setHideButton()}
        {this.setDeleteButton()}
      </div>
    );
  }
}
