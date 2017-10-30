import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from '../actions/auth.actions';
import { bindActionCreators } from 'redux';

import Login from '../components/login';
import Register from '../components/register';

import '../styles/auth.css';

const LOGIN = '/login';

class Auth extends Component {
  static propTypes = {
    route: PropTypes.object,
    register: PropTypes.func,
    login: PropTypes.func,
    error: PropTypes.object,
  };

  render() {
    const register = <Register register={this.props.register} error={this.props.error || {}} />;
    const login = <Login login={this.props.login} error={this.props.error || {}} />;
    const isLogin = this.props.route.path === LOGIN;
    return isLogin ? login : register;
  }
}
const mapStateToProps = state => {
  return state.auth;
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export const AuthContainer = connect(mapStateToProps, mapDispatchToProps)(Auth);
