import React, { Component } from 'react';

import PropTypes from 'prop-types';

export default class Form extends Component {
  static propTypes = {
    elements: PropTypes.array,
    error: PropTypes.object,
    cancel: PropTypes.func,
    title: PropTypes.string,
    handleChange: PropTypes.func,
    handleSubmit: PropTypes.func,
  };

  hasError() {
    const hasError = this.props.elements.filter(el => !el.valid);
    return hasError.length > 0;
  }

  getError(grp) {
    if (grp.valid) return '';
    else return grp.error;
  }

  createApiErrorGroup() {
    return {
      valid: !this.getApiError(),
    };
  }

  getApiError() {
    if (!this.props.error.body) return '';

    return this.props.error.body || '';
  }
  setErrorClassName(classType, grp) {
    if (grp.valid) return classType;
    return `${classType} has-error`;
  }
  render() {
    let button = (
      <div className="form-group">
        <button className="form-control btn-standard" onClick={() => this.props.cancel()}>
          Cancel
        </button>
      </div>
    );

    let cancel = this.props.cancel ? button : <div />;

    return (
      <div className="row form-main">
        <div className="col-md-12">
          <h2 className="create-journal-heading">{this.props.title}</h2>
        </div>
        <div className="col-md-12">
          <form className="form-horizontal">
            {this.props.elements.map(grp => {
              if (grp.type === 'textarea') {
                return (
                  <div className={this.setErrorClassName('form-group', grp)}>
                    <label className="control-label form-control-danger">{grp.label}</label>
                    <textarea
                      className={this.setErrorClassName('form-element form-control', grp)}
                      type="text"
                      value={grp.value}
                      name={grp.name}
                      onChange={this.props.handleChange}
                    />
                    <span className="help-block">{this.getError(grp)}</span>
                  </div>
                );
              }
              return (
                <div className={this.setErrorClassName('form-group', grp)}>
                  <label className="control-label form-control-danger">{grp.label}</label>
                  <input
                    className={this.setErrorClassName('form-element form-control', grp)}
                    type={grp.type || 'text'}
                    value={grp.value}
                    name={grp.name}
                    onChange={this.props.handleChange}
                  />
                  <span className="help-block">{this.getError(grp)}</span>
                </div>
              );
            })}
            <div className={this.setErrorClassName('form-group', this.createApiErrorGroup())}>
              <button
                className={this.setErrorClassName('form-control btn-standard', this.createApiErrorGroup())}
                disabled={this.hasError()}
                onClick={e => this.props.handleSubmit(e)}
              >
                Submit
              </button>
            </div>
            {cancel}
            <di className="form-group">
              <span className="help-block help-block-error">{this.getApiError()}</span>
            </di>
          </form>
        </div>
      </div>
    );
  }
}
