import React, { Component } from 'react';
import Fuse from 'fuse.js';

import PropTypes from 'prop-types';

import '../styles/searchbar.css';

export default class TopSearchBar extends Component {
  static propTypes = {
    items: PropTypes.array,
    onSelectChange: PropTypes.func,
    onChange: PropTypes.func,
    format: PropTypes.func,
    search: PropTypes.array,
    rightCorner: PropTypes.object,
    isDisable: PropTypes.bool,
    placeholder: PropTypes.string,
  };
  fuse;
  constructor(props) {
    super(props);

    this.state = {
      search: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.fuse = this.createFuse(props.items);
  }

  componentWillMount() {
    this.fuse = this.createFuse(this.props.items);
  }

  onSelectChange(e) {
    this.props.onSelectChange(e.target.value);
  }

  onChange(e) {
    // this.fuse = this.createFuse(this.props.items);
    const updatedSearch = e.target.value;
    let results;
    if (updatedSearch) {
      results = this.fuse.search(updatedSearch);
    } else {
      results = [];
    }
    this.props.onChange(results);
  }

  format() {
    if (!this.props.format) return this.props.items;
    return this.props.format(this.props.items);
  }

  createFuse(items) {
    let options = {
      shouldSort: true,
      threshold: 0.2,
      location: 0,
      distance: 10000,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: this.props.search,
    };

    return new Fuse(this.format(items), options);
  }

  render() {
    this.fuse.setCollection(this.props.items);
    const mainBody = (
      <div>
        <form className="form-inline search-form">
          <div className="form-group">
            <input onChange={this.onChange} className="top-search-control" placeholder={this.props.placeholder} />
          </div>
        </form>
        {this.props.rightCorner || ''}
      </div>
    );

    const empty = '';

    const body = this.props.isDisabled ? empty : mainBody;
    return <div className="top-search-bar">{body}</div>;
  }
}
