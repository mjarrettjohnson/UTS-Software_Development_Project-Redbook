import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import PropTypes from 'prop-types';

import * as actions from '../actions/entry.actions';
import { bindActionCreators } from 'redux';

import { isLoggedIn } from '../utils/authentication';

import EntryEdit from '../components/entry-edit';
import Sidemenu from '../components/sidemenu';
import TopSearchBar from '../components/top-search-bar';
import VersionsView from '../components/versions-view';
import Spinner from '../components/spinner';
import SidemenuLink from '../components/side-menu-link';
import PageHeader from '../components/page-header';

import '../styles/sidebar-2.css';
import '../styles/entry.css';

export class Entry extends Component {
  static propTypes = {
    current: PropTypes.object, // entry
    fetchEntry: PropTypes.func,
    deleteEntry: PropTypes.func,
    hideEntry: PropTypes.func,
    toggleAuthorIsEditingEntry: PropTypes.func,
    selectVersionById: PropTypes.func,
    updateEntry: PropTypes.func,
    selectedVersion: PropTypes.object,
    isEditing: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  getVersions() {
    if (this.state.filtered && this.state.filtered.length > 0) return this.state.filtered;

    const versions = this.props.current.versions.map(v => v) || [];
    return versions.reverse();
  }
  componentWillMount() {
    if (!isLoggedIn()) hashHistory.push('/login');
  }

  componentDidMount() {
    this.props.fetchEntry();
    this.setState({});
  }

  onSearchBarChange(filtered) {
    this.setState({ ...this.state, filtered });
  }

  setLinkToDashBoard() {
    return <SidemenuLink name="Dashboard" link="/#/" icon="glyphicon glyphicon-home" />;
  }

  setLinkToJournal() {
    return (
      <SidemenuLink
        link={`/#/journal/${this.props.current.journal.id}/`}
        name={this.props.current.journal.name}
        icon="fa fa-code"
      />
    );
  }

  isVersionActive(id) {
    if (this.props.selectedVersion.id === id) return 'active';
    return '';
  }

  setLinkToHistory() {
    if (this.isHistory()) {
      return (
        <SidemenuLink
          link={`/#/history/${this.props.current.journal.id}/`}
          name="History"
          action={e => this.props.goToHistoryPage(this.props.current.journal)}
          icon="fa fa-history"
        />
      );
    } else return '';
  }

  setVersionLinks() {
    return (
      <ul className="dropdown-menu forAnimate" role="menu">
        {this.props.current.versions.map(version => (
          <li key={version.id} className={this.isVersionActive(version.id)}>
            <a onClick={() => this.props.selectVersionById(version.id)}>{version.created}</a>
          </li>
        ))}
      </ul>
    );
  }

  setLinkToEntry() {
    if (!this.props.isEditing) {
      const caret = <span className="caret" />;
      const innerList = this.setVersionLinks();

      return (
        <SidemenuLink
          activeClass="active"
          linkClass="dropdown-toggle"
          linkDataToggle="dropdown"
          name={this.props.current.versions[this.props.current.versions.length - 1].title}
          caret={caret}
          innerList={innerList}
          icon="fa fa-database"
        />
      );
    } else {
      return (
        <SidemenuLink
          activeClass="active"
          link={`/#/journal/${this.props.current.journal.id}/entry/${this.props.current.id}`}
          name={this.props.current.versions[this.props.current.versions.length - 1].title}
          icon="fa fa-database"
        />
      );
    }
  }

  setBreadCrumbs() {
    if (this.isHistory()) {
      return (
        <PageHeader
          crumbs={[
            { title: 'Dashboard', link: '/#/' },
            { title: `${this.props.current.journal.name}`, link: `/#/journal/${this.props.current.journal.id}/` },
            { title: `History`, link: `/#/History/${this.props.current.journal.id}/` },
            { title: `${this.props.current.versions[this.props.current.versions.length - 1].title}`, isActive: true },
          ]}
        />
      );
    } else {
      return (
        <PageHeader
          crumbs={[
            { title: 'Dashboard', link: '/#/' },
            { title: `${this.props.current.journal.name}`, link: `/#/journal/${this.props.current.journal.id}/` },
            { title: `${this.props.current.versions[this.props.current.versions.length - 1].title}`, isActive: true },
          ]}
        />
      );
    }
  }

  isHistory() {
    return window.location.href.split('/')[4] === 'history';
  }

  render() {
    if (!this.props.current) return <Spinner />;
    const sidemenu = (
      <Sidemenu
        extraItems={[
          this.setLinkToDashBoard(),
          this.setLinkToJournal(),
          this.setLinkToHistory(),
          this.setLinkToEntry(),
        ]}
      />
    );
    const entryView = (
      <div className="page-wrapper">
        {sidemenu}
        <TopSearchBar
          items={this.getVersions()}
          search={['created', 'textBody', 'title']}
          onChange={this.onSearchBarChange.bind(this)}
          placeholder="Filter Version by Title, Keyword, Time, Day, Month or Year"
        />
        {this.setBreadCrumbs()}
        <VersionsView
          deleteEntry={this.props.deleteEntry}
          hideEntry={this.props.hideEntry}
          versions={this.getVersions()}
          current={this.props.current}
          toggleAuthorIsEditingEntry={this.props.toggleAuthorIsEditingEntry}
          selectVersionById={this.props.selectVersionById}
          selectedVersion={this.props.selectedVersion}
        />
      </div>
    );

    const entryEdit = (
      <div className="entry-edit-container">
        <EntryEdit
          action={this.props.updateEntry}
          version={this.props.selectedVersion}
          cancel={this.props.toggleAuthorIsEditingEntry}
          error={this.props.error}
          isEdit={true}
        />
      </div>
    );

    return this.props.isEditing ? entryEdit : entryView;
  }
}

function mapStateToProps(state) {
  return {
    journal: state.journal.current,
    error: state.entry.error,
    current: state.entry.current,
    isEditing: state.entry.isEditing,
    selectedVersion: state.entry.selectedVersion,
    userIsHidingEntry: state.entry.userIsHidingEntry,
    userIsDeletingEntry: state.entry.userIsDeletingEntry,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export const EntryContainer = connect(mapStateToProps, mapDispatchToProps)(Entry);
