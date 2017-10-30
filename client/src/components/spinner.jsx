import React, { Component } from 'react';
import '../styles/spinner.css';

export default class Spinner extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-12 body-container">
          <div className="sk-cube-grid">
            <div className="sk-cube sk-cube1" />
            <div className="sk-cube sk-cube2" />
            <div className="sk-cube sk-cube3" />
            <div className="sk-cube sk-cube4" />
            <div className="sk-cube sk-cube5" />
            <div className="sk-cube sk-cube6" />
            <div className="sk-cube sk-cube7" />
            <div className="sk-cube sk-cube8" />
            <div className="sk-cube sk-cube9" />
          </div>
        </div>
      </div>
    );
  }
}
