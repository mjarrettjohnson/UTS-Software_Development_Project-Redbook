import ErrorHandler from '../utils/error-handler';
import * as types from '../actions/journal.actions';
import { hashHistory } from 'react-router';

const fetchEntriesSuccess = (state, journal) => {
  return {
    ...state,
    current: journal,
  };
};

const createEntrySuccess = (state, journal) => {
  return {
    ...state,
    current: journal,
  };
};

const toggleUserIsCreatingEntry = state => {
  if (!state.userIsCreatingEntry) {
    return {
      ...state,
      userIsCreatingEntry: true,
      error: {},
    };
  }
  return {
    ...state,
    userIsCreatingEntry: !state.userIsCreatingEntry,
  };
};

const toggleShowHiddenEntries = state => {
  if (!state.showHiddenEntries) {
    return {
      ...state,
      showHiddenEntries: true,
      error: {},
    };
  }
  return {
    ...state,
    showHiddenEntries: !state.showHiddenEntries,
  };
};

const goToEntryPage = (state, entry) => {
  hashHistory.push(`/journal/${entry.journal}/entry/${entry.id}/`);
  return {
    ...state,
    entry,
  };
};

const goToHistoryPage = (state, journal) => {
  return {
    ...state,
    journal,
    history: true,
  };
};

const goToHistoryEntryPage = (state, entry) => {
  hashHistory.push(`/history/${entry.journal}/entry/${entry.id}/`);
  return {
    ...state,
    entry,
    history: true,
  };
};

const handleError = (state, error) => {
  return {
    ...state,
    isLoggedIn: false,
    error: ErrorHandler.handle(error),
  };
};

const hideEntrySucess = (state, updated) => {
  const journal = state.current;
  const updatedEntries = journal.entries.map(entry => {
    if (entry.id === updated.id) return updated;
    return entry;
  });

  return {
    ...state,
    current: { ...journal, entries: updatedEntries },
  };
};

const deleteEntrySuccess = (state, updated) => {
  const journal = state.current;
  const updatedEntries = journal.entries.map(entry => {
    if (entry.id === updated.id) return updated;
    return entry;
  });

  return {
    ...state,
    current: { ...journal, entries: updatedEntries },
  };
};

const searchEntriesSuccess = (state, entries) => {
  return {
    ...state,
    current: { ...state.current, search: entries },
  };
};

const clearSearch = state => {
  return {
    ...state,
    current: { ...state.current, search: [] },
  };
};

export default function dashboard(state = {}, action) {
  switch (action.type) {
    case types.FETCH_ENTRIES_SUCCESS:
      return fetchEntriesSuccess(state, action.journal);
    case types.FETCH_ENTRIES_FAILURE:
      return handleError(state, action.error);
    case types.CREATE_ENTRY_SUCESS:
      return createEntrySuccess(state, action.journal);
    case types.CREATE_ENTRY_FAILURE:
      return handleError(state, action.error);
    case types.TOGGLE_USER_IS_CREATING_ENTRY:
      return toggleUserIsCreatingEntry(state);
    case types.GO_TO_ENTRY_PAGE:
      return goToEntryPage(state, action.entry);
    case types.TOGGLE_SHOW_HIDDEN_ENTRIES:
      return toggleShowHiddenEntries(state);
    case types.GO_TO_HISTORY_PAGE:
      return goToHistoryPage(state, action.journal);
    case types.GO_TO_HISTORY_ENTRY_PAGE:
      return goToHistoryEntryPage(state, action.entry);
    case types.HIDE_ENTRY_SUCCESS:
      return hideEntrySucess(state, action.entry);
    case types.DELETE_ENTRY_SUCCESS:
      return deleteEntrySuccess(state, action.entry);
    case types.HIDE_ENTRY_FAILURE:
    case types.DELETE_ENTRY_FAILURE:
      return handleError(state, action.error);
    case types.SEARCH_ENTRIES_SUCCESS:
      return searchEntriesSuccess(state, action.entries);
    case types.SEARCH_ENTRIES_FAILURE:
      return handleError(state, action.err);
    case types.CLEAR_SEARCH:
      return clearSearch(state);
    default:
      return state;
  }
}
