import React, { Component } from 'react';
import marked from 'marked';
import ReactHtmlParser from 'react-html-parser';

import PropTypes from 'prop-types';

export default class EntryEditLiveView extends Component {
  static propTypes = {
    title: PropTypes.string,
    textBody: PropTypes.string,
    isOnlyLiveView: PropTypes.bool,
    toggle: PropTypes.func,
  };

  parser = ReactHtmlParser;

  parseTextBody() {
    try {
      const textBody = this.props.textBody;
      if (textBody) {
        return this.parser(marked(textBody));
      }
    } catch (e) {
      return <div>Something went wrong</div>;
    }
  }

  setClassName() {
    if (this.props.isOnlyLiveView) return 'col-md-6 col-sm-6  live-view';
    return 'col-md-6 col-sm-6 hidden-xs live-view';
  }

  render() {
    let toggleButton = (
      <div className="pull-right hidden-lg hidden-md hidden-sm showopacity">
        <button onClick={this.props.toggle} className="show-live-view">
          <i className="fa fa-exchange " />
        </button>
      </div>
    );

    const toggle = this.props.isOnlyLiveView ? toggleButton : '';

    return (
      <div className={this.setClassName()}>
        <div className="text-center">
          <h1>{this.props.title}</h1>
          {toggle}
        </div>
        <hr />
        {this.parseTextBody()}
      </div>
    );
  }
}
