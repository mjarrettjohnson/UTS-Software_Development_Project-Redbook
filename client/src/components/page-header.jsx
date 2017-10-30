import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../styles/page-header.css';

export default class PageHeader extends Component {
  static propTypes = {
    crumbs: PropTypes.array,
  };

  setActiveClass(item) {
    if (!item.isActive) return 'breadcrumb-item';
    return 'breadcrumb-item active';
  }

  setActiveLink(item) {
    if (item.isActive) return item.title;
    return <a href={item.link}>{item.title}</a>;
  }

  render() {
    return (
      <ol className="breadcrumb ">
        {this.props.crumbs.map(crumb => <li className={this.setActiveClass(crumb)}>{this.setActiveLink(crumb)}</li>)}
      </ol>
    );
  }
}
