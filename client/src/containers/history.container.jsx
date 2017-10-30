import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import PropTypes from 'prop-types';

import * as actions from '../actions/journal.actions';
import { bindActionCreators } from 'redux';

import { isLoggedIn } from '../utils/authentication';

import Tile from '../components/tile';
import Sidemenu from '../components/sidemenu';
import TopSearchBar from '../components/top-search-bar';
import SidemenuLink from '../components/side-menu-link';
import PageHeader from '../components/page-header';
import ModalBox from '../components/modal';

import DateFormatter from '../utils/date-formatter';
import '../styles/journal.css';

export class History extends Component {
  static propTypes = {
    journal: PropTypes.object,
    fetchEntries: PropTypes.func,
    error: PropTypes.object,
    goToHistoryEntryPage: PropTypes.func,
    searchEntries: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  getFiltered() {
    const entries = [];
    this.state.filtered.forEach(filter => {
      this.props.journal.entries
        .map(this.formatEntryForTile)
        .reverse()
        .forEach(entry => {
          if (entry.id === filter.id) {
            entries.push(entry);
          }
        });
    });
    return entries;
  }

  getSearchEntries() {
    const entries = [];
    this.props.journal.search.forEach(filter => {
      this.props.journal.entries
        .map(this.formatEntryForTile)
        .reverse()
        .forEach(entry => {
          if (entry.id === filter.id) {
            entries.push(entry);
          }
        });
    });
    return entries;
  }

  getEntries() {
    if (this.state.filtered && this.state.filtered.length > 0) return this.getFiltered();
    else if (this.props.journal && this.props.journal.search && this.props.journal.search.length > 0)
      return this.getSearchEntries();
    return this.props.journal ? this.props.journal.entries.map(this.formatEntryForTile).reverse() : [];
  }

  componentWillMount() {
    if (!isLoggedIn()) hashHistory.push('/login');
  }

  formatEntryForTile(entry) {
    entry.title = entry.versions[entry.versions.length - 1].title;
    entry.textBody = entry.versions[entry.versions.length - 1].textBody;
    entry.created = DateFormatter.getLongDateString(new Date(entry.createdAt));
    entry.itemCount = { name: 'Versions', value: entry.versions.length };

    entry.hidden = entry.isHidden ? 'hidden' : '';
    entry.deleted = entry.isDeleted ? 'deleted' : '';
    return entry;
  }

  componentDidMount() {
    this.props.fetchEntries();
  }

  getJournal() {
    return this.props.journal || {};
  }

  onSearchBarChange(filtered) {
    this.setState({ ...this.state, filtered });
  }

  setLinkToDashBoard() {
    return <SidemenuLink name="Dashboard" link="/#/" icon="glyphicon glyphicon-home" />;
  }

  setLinkToJournal() {
    return (
      <SidemenuLink link={`/#/journal/${this.props.journal.id}/`} name={this.props.journal.name} icon="fa fa-code" />
    );
  }

  setSearchLink() {
    return <ModalBox action={this.props.searchEntries} />;
  }

  setLinkToHistory() {
    return (
      <SidemenuLink
        link={`/#/history/${this.props.journal.id}/`}
        activeClass="active"
        name="History"
        action={e => this.props.goToHistoryPage(this.props.journal)}
        icon="fa fa-history"
      />
    );
  }

  setClearSearchBtn() {
    const journal = this.props.journal;
    if (journal && journal.search && journal.search.length > 0) {
      return (
        <button className="clear-search" onClick={this.props.clearSearch}>
          <i className="glyphicon glyphicon-remove" />
        </button>
      );
    }
    return '';
  }

  render() {
    const emptyJournal = <div>This Journal Does not contain any entries.</div>;

    const entryList = (
      <div>
        {this.getEntries().map((entry, index) => (
          <Tile
            key={entry.id}
            item={entry}
            action={this.props.goToHistoryEntryPage}
            format={this.formatEntryForTile.bind(this)}
            index={index}
          />
        ))}
      </div>
    );

    const body = this.props.userIsCreatingEntry ? emptyJournal : entryList;

    if (!this.props.journal) return <div />;
    return (
      <div>
        <Sidemenu
          extraItems={[
            this.setLinkToDashBoard(),
            this.setLinkToJournal(),
            this.setLinkToHistory(),
            this.setSearchLink(),
          ]}
        />
        <TopSearchBar
          items={this.getEntries()}
          search={['title', 'created', 'hidden', 'deleted']}
          onChange={this.onSearchBarChange.bind(this)}
          placeholder="Filter Entries by Title, Keyword, Time, Day, Month, Year or an entries hidden or deleted status"
        />
        <PageHeader
          crumbs={[
            { title: 'Dashboard', link: '/#/' },
            { title: `${this.props.journal.name}`, link: `/#/journal/${this.props.journal.id}/` },
            { title: `History`, isActive: true },
          ]}
        />
        {this.setClearSearchBtn()}
        <div className="tile-container">{body}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    journal: state.journal.current,
    error: state.journal.error,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export const HistoryContainer = connect(mapStateToProps, mapDispatchToProps)(History);
