import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ButtonPanel from './btn-panel';
import '../styles/tile.css';
import '../styles/shared.css';
export default class Tile extends Component {
  static propTypes = {
    item: PropTypes.object,
    action: PropTypes.func,
    format: PropTypes.func,
    index: PropTypes.number,
    isEntry: PropTypes.bool,
  };
  click() {
    this.props.action(this.props.item);
  }

  getFormattedItem() {
    return this.props.format(this.props.item);
  }

  isItemHidden() {
    return !!this.props.item.isHidden;
  }

  isItemDeleted() {
    return this.props.item.isDeleted;
  }

  setHiddenText() {
    if (!this.isItemHidden() || this.props.isEntry) return '';
    if (this.isItemDeleted()) return '';
    return (
      <span className="pull-right  showopacity span-hidden">
        <i className="glyphicon glyphicon-eye-close" />
      </span>
    );
  }

  setDeletedText() {
    if (!this.isItemDeleted()) return '';
    return (
      <span className="pull-right showopacity span-deleted">
        <i className="glyphicon glyphicon-trash" />
      </span>
    );
  }

  setTileClass() {
    let tileClass = 'tile col-md-3 col-sm-3';
    if (this.isItemHidden()) tileClass += ' tile-hidden';
    if (this.isItemDeleted()) tileClass += ' tile-deleted';
    return tileClass;
  }

  selectRandomGlyphicon() {
    const glyphs = [
      'fa fa-terminal',
      'fa fa-thermometer',
      'fa fa-linode',
      'fa fa-telegram',
      'fa fa-grav',
      'fa fa-free-code-camp',
      'fa fa-superpowers',
      'fa fa-snowflake-o',
      'fa fa-shower',
      'fa fa-adjust',
      'fa fa-eraser',
      'fa fa-bath',
      'fa fa-bicycle',
      'fa fa-bell',
      'fa fa-bug',
      'fa fa-cloud',
      'fa fa-cubes',
      'fa fa-fighter-jet',
      'fa fa-flash',
      'fa fa-hashtag',
      'fa fa-heartbeat',
    ];
    const max = glyphs.length - 1;
    const index = this.props.index % max;
    return glyphs[index] + ' tile-logo';
  }

  setButtonPanel() {
    if (!this.props.isEntry) return '';
    return (
      <ButtonPanel current={this.props.item} hideEntry={this.props.hideEntry} deleteEntry={this.props.deleteEntry} />
    );
  }

  render() {
    let body;
    if (!this.props.item) {
      body = (
        <div>
          <div className="tile col-md-3 tile-add" onClick={() => this.click()}>
            <div className="row">
              <div className="col-md-12 text-center tile-body">
                <i className="glyphicon glyphicon-plus tile-plus" />
              </div>
            </div>
          </div>
          <div className="small-add-button">
            <button onClick={() => this.click()}>
              <i className="glyphicon glyphicon-plus" />
            </button>
          </div>
        </div>
      );
    } else {
      const item = this.getFormattedItem();

      body = (
        <div className={this.setTileClass()}>
          <div className="row">
            {this.setButtonPanel()}
            {this.setDeletedText()}
            {this.setHiddenText()}
          </div>
          <div onClick={() => this.click()}>
            <div className="row">
              <div className="col-md-12 tile-img text-center hidden-xs">
                <i className={this.selectRandomGlyphicon()} />
              </div>
            </div>
            <hr className="tile-divider hidden-xs" />
            <div className="row">
              <div className="col-md-12 text-center tile-text">
                <h3 className="tile-heading">
                  <strong>{item.title}</strong>
                </h3>
                <h4>
                  {item.itemCount.name}: {item.itemCount.value}
                </h4>
                <h4>{item.created}</h4>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return body;
  }
}
