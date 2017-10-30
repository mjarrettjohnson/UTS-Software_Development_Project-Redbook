import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import PropTypes from 'prop-types';

import * as actions from '../actions/journal.actions';
import { bindActionCreators } from 'redux';

import { isLoggedIn } from '../utils/authentication';
import DateFormatter from '../utils/date-formatter';

import Sidemenu from '../components/sidemenu';
import TopSearchBar from '../components/top-search-bar';
import EntryEdit from '../components/entry-edit';
import Spinner from '../components/spinner';
import SidemenuLink from '../components/side-menu-link';
import TileList from '../components/tile-list';
import ModalBox from '../components/modal';

import PageHeader from '../components/page-header';

import '../styles/journal.css';

export class Journal extends Component {
  static propTypes = {
    journal: PropTypes.object,
    fetchEntries: PropTypes.func,
    showHiddenEntries: PropTypes.bool,
    toggleShowHiddenEntries: PropTypes.func,
    error: PropTypes.object,
    createEntry: PropTypes.func,
    toggleUserIsCreatingEntry: PropTypes.func,
    userIsCreatingEntry: PropTypes.bool,
    goToEntryPage: PropTypes.func,
    goToHistoryPage: PropTypes.func,
    hideEntry: PropTypes.func,
    deleteEntry: PropTypes.func,
    userIsHidingEntry: PropTypes.bool,
    userIsDeletingEntry: PropTypes.bool,
    isEntry: PropTypes.bool,
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
          if (entry.id === filter.id && !entry.isDeleted) {
            if (this.props.showHiddenEntries) {
              entries.push(entry);
            } else if (!entry.isHidden) {
              entries.push(entry);
            }
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
          if (entry.id === filter.id && !entry.isDeleted) {
            if (this.props.showHiddenEntries) {
              entries.push(entry);
            } else if (!entry.isHidden) {
              entries.push(entry);
            }
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

  setLinkToDashBoard() {
    return <SidemenuLink key="Dashboard" name="Dashboard" link="/#/" icon="glyphicon glyphicon-home" />;
  }

  setLinkToHistory() {
    return (
      <SidemenuLink
        key="History"
        link={`/#/history/${this.props.journal.id}/`}
        name="History"
        action={e => this.props.goToHistoryPage(this.props.journal)}
        icon="fa fa-history"
      />
    );
  }

  setSearchLink() {
    return <ModalBox action={this.props.searchEntries} />;
  }

  setJournalEntryLinks(entry) {
    if ((!this.props.showHiddenEntries && entry.isHidden) || entry.isDeleted) return '';
    return (
      <li key={entry.id}>
        <a onClick={() => this.props.goToEntryPage(entry)}>{entry.versions[entry.versions.length - 1].title}</a>
      </li>
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

  setLinkToJournal() {
    const caret = <span className="caret" />;
    const innerList = (
      <ul className="dropdown-menu forAnimate" role="menu">
        {this.props.journal.entries.map(entry => this.setJournalEntryLinks(entry))}
      </ul>
    );
    return (
      <SidemenuLink
        key="journal"
        activeClass="active"
        linkClass="dropdown-toggle"
        linkDataToggle="dropdown"
        name={this.props.journal.name}
        caret={caret}
        innerList={innerList}
        icon="fa fa-code"
      />
    );
  }

  formatEntryForTile(entry) {
    entry.title = entry.versions[entry.versions.length - 1].title;
    entry.textBody = entry.versions[entry.versions.length - 1].textBody;
    entry.created = DateFormatter.getLongDateString(new Date(entry.createdAt));
    entry.itemCount = { name: 'Versions', value: entry.versions.length };

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

  setShowHiddenLink() {
    if (!this.props.showHiddenEntries) {
      return (
        <li>
          <a onClick={e => this.props.toggleShowHiddenEntries()}>
            Show Hidden
            <span
              style={{ fontSize: '16px' }}
              className="pull-right hidden-xs showopacity glyphicon glyphicon-unchecked"
            />
          </a>
        </li>
      );
    } else {
      return (
        <li>
          <a onClick={e => this.props.toggleShowHiddenEntries()}>
            Conceal Hidden
            <span style={{ fontSize: '16px' }} className="pull-right hidden-xs showopacity glyphicon glyphicon-check" />
          </a>
        </li>
      );
    }
  }

  excludeHidden(entry) {
    return !entry.isDeleted && !entry.isHidden;
  }

  includeHidden(entry) {
    return !entry.isDeleted;
  }

  toggleIsViewingHelp() {
    this.setState({ isViewingHelp: !this.state.isViewingHelp });
  }

  render() {
    const createEntry = (
      <EntryEdit
        error={this.props.error}
        action={this.props.createEntry}
        cancel={this.props.toggleUserIsCreatingEntry}
        journal={this.props.journal}
        isEdit={false}
      />
    );

    const filter = this.props.showHiddenEntries ? this.includeHidden : this.excludeHidden;

    const entryList = (
      <div>
        <span>{this.props.successMsg || ''}</span>
        <TileList
          format={this.formatEntryForTile.bind(this)}
          action={this.props.goToEntryPage}
          toggle={this.props.toggleUserIsCreatingEntry}
          items={this.getEntries()}
          divClass="hide-sm hide-xs"
          filter={filter}
          hideEntry={this.props.hideEntry}
          deleteEntry={this.props.deleteEntry}
          userIsHidingEntry={this.props.userIsHidingEntry}
          userIsDeletingEntry={this.props.userIsDeletingEntry}
          isEntry={true}
        />
      </div>
    );

    if (!this.props.journal) return <Spinner />;
    if (this.props.userIsCreatingEntry) {
      return <div className="entry-edit-container">{createEntry}</div>;
    } else {
      return (
        <div className="page-wrapper">
          <Sidemenu
            extraItems={[
              this.setLinkToDashBoard(),
              this.setLinkToJournal(),
              this.setLinkToHistory(),
              this.setShowHiddenLink(),
              this.setSearchLink(),
            ]}
          />
          <TopSearchBar
            items={this.getEntries()}
            search={['title', 'created', 'textBody']}
            onChange={this.onSearchBarChange.bind(this)}
            isDisabled={this.props.userIsCreatingEntry}
            placeholder="Filter Entries by Title, Keyword, Time, Day, Month or Year"
          />
          <PageHeader
            crumbs={[{ title: 'Dashboard', link: '/#/' }, { title: `${this.props.journal.name}`, isActive: true }]}
          />
          {this.setClearSearchBtn()}

          <div className="tile-container">{entryList}</div>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    journal: state.journal.current,
    userIsCreatingEntry: state.journal.userIsCreatingEntry,
    error: state.journal.error,
    showHiddenEntries: state.journal.showHiddenEntries,
    userIsHidingEntry: state.journal.userIsHidingEntry,
    userIsDeletingEntry: state.journal.userIsDeletingEntry,
    successMsg: state.journal.successMsg,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export const JournalContainer = connect(mapStateToProps, mapDispatchToProps)(Journal);
