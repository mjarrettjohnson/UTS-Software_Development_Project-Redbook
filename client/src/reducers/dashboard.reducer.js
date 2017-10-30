import ErrorHandler from '../utils/error-handler';
import * as types from '../actions/dashboard.actions';
import { hashHistory } from 'react-router';

const fetchJournalSuccess = (state, journals) => {
  return {
    ...state,
    journals: journals.map(j => j),
  };
};

const createJournalSuccess = (state, journal) => {
  const updatedJournalList = state.journals.map(journal => journal);
  updatedJournalList.push(journal);
  return {
    ...state,
    journals: updatedJournalList,
  };
};

const toggleUserIsCreatingJournal = state => {
  if (!state.userIsCreatingJournal) {
    return {
      ...state,
      userIsCreatingJournal: true,
      error: {},
    };
  }
  return {
    ...state,
    userIsCreatingJournal: !state.userIsCreatingJournal,
  };
};

const goToJournalPage = (state, journal) => {
  hashHistory.push(`/journal/${journal.id}/`);
  return {
    ...state,
    journal,
  };
};

const handleError = (state, error) => {
  return {
    ...state,
    isLoggedIn: false,
    error: ErrorHandler.handle(error),
  };
};

export default function dashboard(state = {}, action) {
  switch (action.type) {
    case types.JOURNAL_CREATE_SUCCESS:
      return createJournalSuccess(state, action.journal);
    case types.JOURNAL_CREATE_ERROR:
      return handleError(state, action.error);
    case types.JOURNAL_FETCH_SUCCESS:
      return fetchJournalSuccess(state, action.journals);
    case types.JOURNAL_FETCH_ERROR:
      return handleError(state, action.error);
    case types.TOGGLE_USER_IS_CREATING_JOURNAL:
      return toggleUserIsCreatingJournal(state);
    case types.GO_TO_JOURNAL_PAGE:
      return goToJournalPage(state, action.journal);
    default:
      return state;
  }
}
