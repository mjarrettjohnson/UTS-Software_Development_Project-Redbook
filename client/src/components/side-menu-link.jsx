import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SidemenuLink extends Component {
  static propTypes = {
    name: PropTypes.string,
    link: PropTypes.string,
    activeClass: PropTypes.string,
    icon: PropTypes.string,
    caret: PropTypes.object,
    linkClass: PropTypes.string,
    linkDataToggle: PropTypes.string,
    innerList: PropTypes.object,
  };

  setIcon() {
    return `pull-right hidden-xs showopacity ${this.props.icon || ''}`;
  }

  render() {
    return (
      <li className={this.props.activeClass || ''}>
        <a
          className={this.props.linkClass || ''}
          data-toggle={this.props.linkDataToggle || ''}
          href={this.props.link || ''}
        >
          {this.props.name}
          {this.props.caret || ''}
          <span style={{ fontSize: '16px' }} className={this.setIcon()} />
        </a>
        {this.props.innerList || ''}
      </li>
    );
  }
}
