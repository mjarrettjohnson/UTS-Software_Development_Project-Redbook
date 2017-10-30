import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Tile from '../components/tile';

export default class TileList extends Component {
  static propTypes = {
    toggle: PropTypes.func,
    action: PropTypes.func,
    items: PropTypes.array,
    divClass: PropTypes.string,
    hideEntry: PropTypes.func,
    deleteEntry: PropTypes.func,
    userIsHidingEntry: PropTypes.bool,
    userIsDeletingEntry: PropTypes.bool,
    isEntry: PropTypes.bool,
  };

  filter(items) {
    if (!this.props.filter) return items;
    return items.filter(this.props.filter);
  }

  render() {
    return (
      <div className={this.props.divClass || ''}>
        <Tile action={this.props.toggle} />
        {this.filter(this.props.items).map((item, index) => (
          <Tile
            key={item.id}
            action={this.props.action}
            format={this.props.format}
            item={item}
            title={item.name}
            index={index}
            hideEntry={this.props.hideEntry}
            deleteEntry={this.props.deleteEntry}
            userIsHidingEntry={this.props.userIsHidingEntry}
            userIsDeletingEntry={this.props.userIsDeletingEntry}
            isEntry={this.props.isEntry}
          />
        ))}
      </div>
    );
  }
}
