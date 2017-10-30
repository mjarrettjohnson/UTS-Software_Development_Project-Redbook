import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../components/spinner';

import * as actions from '../actions/dashboard.actions';
import { bindActionCreators } from 'redux';

import { isLoggedIn } from '..//utils/authentication';
import { hashHistory } from 'react-router';

import CreateJournalForm from '../components/create-journal';

import Sidemenu from '../components/sidemenu';
import TopSearchBar from '../components/top-search-bar';
import SidemenuLink from '../components/side-menu-link';
import TileList from '../components/tile-list';
import PageHeader from '../components/page-header';

import DateFormatter from '../utils/date-formatter';

export default class Dashboard extends Component {
  static propTypes = {
    journals: PropTypes.array,
    fetchJournals: PropTypes.func,
    error: PropTypes.object,
    createJournal: PropTypes.func,
    toggleUserIsCreatingJournal: PropTypes.func,
    userIsCreatingJournal: PropTypes.bool,
    goToJournalPage: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  getJournals() {
    if (this.state.filtered && this.state.filtered.length > 0) return this.state.filtered;
    return this.props.journals.sort(this.sortByDate).reverse() || [];
  }

  sortByDate(a, b) {
    const aDate = new Date(a.createdAt);
    const bDate = new Date(b.createdAt);
    return aDate.getTime() - bDate.getTime();
  }

  onSearchBarChange(filtered) {
    this.setState({ ...this.state, filtered });
  }

  componentWillMount() {
    if (!isLoggedIn()) hashHistory.push('/login');
    this.props.fetchJournals();
  }

  formatJournalForTile(journal) {
    return {
      title: journal.name,
      itemCount: {
        name: 'Entries',
        value: journal.entries.filter(entry => !entry.isHidden && !entry.isDeleted).length,
      },
      created: DateFormatter.getLongDateString(new Date(journal.createdAt)),
    };
  }

  setLinkToDashboard() {
    return <SidemenuLink name="Dashboard" link="/#/" icon="glyphicon glyphicon-home" activeClass="active" />;
  }

  formatJournalsForSearchBar() {
    return this.getJournals().map(journal => {
      journal.created = DateFormatter.getLongDateString(new Date(journal.createdAt));
      return journal;
    });
  }

  render() {
    if (!this.props.journals) return <Spinner />;
    const createJournal = (
      <CreateJournalForm
        error={this.props.error}
        action={this.props.createJournal}
        cancel={this.props.toggleUserIsCreatingJournal}
      />
    );
    const journalList = (
      <div className="row">
        <div className="col-md-12 body-container">
          <TileList
            format={this.formatJournalForTile.bind(this)}
            action={this.props.goToJournalPage}
            toggle={this.props.toggleUserIsCreatingJournal}
            items={this.getJournals()}
          />
        </div>
      </div>
    );

    const body = this.props.userIsCreatingJournal ? createJournal : journalList;

    return (
      <div>
        <div className="page-wrapper">
          <Sidemenu extraItems={[this.setLinkToDashboard()]} />

          <TopSearchBar
            items={this.formatJournalsForSearchBar()}
            search={['name', 'created', 'year', 'month', 'day', 'time']}
            onChange={this.onSearchBarChange.bind(this)}
            placeholder="Filter Journals by Title, Time, Day, Month or Year"
          />

          <div className="tile-container">
            <PageHeader crumbs={[{ title: 'Dashboard', isActive: true }]} />
            {body}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    journals: state.dashboard.journals,
    userIsCreatingJournal: state.dashboard.userIsCreatingJournal,
    error: state.dashboard.error,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export const DashboardContainer = connect(mapStateToProps, mapDispatchToProps)(Dashboard);
