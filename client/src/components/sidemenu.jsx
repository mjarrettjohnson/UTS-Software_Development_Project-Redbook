import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import PropTypes from 'prop-types';
import { logout } from '../utils/authentication';

import '../styles/sidemenu.css';

export default class Sidemenu extends Component {
  static propTypes = {
    extraItems: PropTypes.array,
  };

  getExtraItems() {
    return this.props.extraItems || [];
  }

  navigate(route) {
    hashHistory.push(route);
  }

  render() {
    return (
      <nav className="navbar navbar-inverse sidebar sidebar-main" role="navigation">
        <div className="container-fluid brand-container">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle"
              data-toggle="collapse"
              data-target="#bs-sidebar-navbar-collapse-1"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <a className="navbar-brand brand" href="" onClick={() => this.navigate('/')}>
              <strong>Redbook</strong>
            </a>
          </div>

          <div className="collapse navbar-collapse" id="bs-sidebar-navbar-collapse-1">
            <ul className="nav navbar-nav sidebar-link">
              {this.getExtraItems().map(item => item)}
              <li>
                <a onClick={logout}>
                  Logout<span
                    style={{ fontSize: '16px' }}
                    className="pull-right hidden-xs showopacity glyphicon glyphicon-user"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
