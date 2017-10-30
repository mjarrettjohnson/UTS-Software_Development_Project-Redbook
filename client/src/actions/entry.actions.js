import * as request from '../utils/request';
import BASE_URL from '../utils/base-url';

// action types

export const FETCH_ENTRY_SUCCESS = 'FETCH_ENTRY_SUCCESS';
export const FETCH_ENTRY_ERROR = 'FETCH_ENTRY_ERROR';
export const TOGGLE_AUTHOR_IS_EDITING_ENTRY = 'TOGGLE_AUTHOR_IS_EDITING_ENTRY';
export const UPDATE_ENTRY_SUCCESS = 'UPDATE_ENTRY_SUCCESS';
export const UPDATE_ENTRY_FAILURE = 'UPDATE_ENTRY_FAILURE';
export const SELECT_VERSION_BY_ID = 'SELECT_VERSION_BY_ID';

// actions

export const fetchEntrySuccess = entry => {
  return { type: FETCH_ENTRY_SUCCESS, entry };
};

export const fetchEntryFailure = error => {
  return { type: FETCH_ENTRY_ERROR, error };
};

export const toggleAuthorIsEditingEntry = () => {
  return { type: TOGGLE_AUTHOR_IS_EDITING_ENTRY };
};

export const updateEntrySuccess = entry => {
  return { type: UPDATE_ENTRY_SUCCESS, entry };
};

export const updateEntryFailure = error => {
  return { type: UPDATE_ENTRY_FAILURE, error };
};

export const selectVersionById = id => {
  return { type: SELECT_VERSION_BY_ID, id };
};

// helper function to get the ids from the url

const getJournalIdAndEntryId = () => {
  return {
    entryId: window.location.href.split('/')[7],
    journalId: window.location.href.split('/')[5],
  };
};

// thunks

export const fetchEntry = () => dispatch => {
  const { journalId, entryId } = getJournalIdAndEntryId();
  request
    .fetchAuth(`${BASE_URL}/api/journal/${journalId}/entry/${entryId}`, 'GET')
    .then(res => {
      if (res.status > 400) throw new Error(res.data);
      dispatch(fetchEntrySuccess(res.data));
    })
    .catch(err => {
      dispatch(fetchEntryFailure(err));
    });
};

export const updateEntry = version => dispatch => {
  const { journalId, entryId } = getJournalIdAndEntryId();
  request
    .fetchAuth(`${BASE_URL}/api/journal/${journalId}/entry/${entryId}`, 'PATCH', version)
    .then(res => {
      if (res.status > 400) throw new Error(res.data);
      dispatch(updateEntrySuccess(res.data));
    })
    .catch(err => {
      dispatch(updateEntryFailure(err));
    });
};
