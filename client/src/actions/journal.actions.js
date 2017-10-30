import * as request from '../utils/request';
import BASE_URL from '../utils/base-url';

// action types

export const FETCH_ENTRIES_SUCCESS = 'FETCH_ENTRIES_SUCCESS';
export const FETCH_ENTRIES_FAILURE = 'FETCH_ENTRIES_FAILURE';
export const CREATE_ENTRY_SUCESS = 'CREATE_ENTRY_SUCCESS';
export const CREATE_ENTRY_FAILURE = 'CREATE_ENTRY_FAILURE';
export const TOGGLE_USER_IS_CREATING_ENTRY = 'TOGGLE_USER_IS_CREATING_ENTRY';
export const TOGGLE_SHOW_HIDDEN_ENTRIES = 'TOGGLE_SHOW_HIDDEN_ENTRIES';
export const GO_TO_ENTRY_PAGE = 'GO_TO_ENTRY_PAGE';
export const GO_TO_HISTORY_PAGE = 'GO_TO_HISTORY_PAGE';
export const GO_TO_HISTORY_ENTRY_PAGE = 'GO_TO_HISTORY_ENTRY_PAGE';

export const HIDE_ENTRY_SUCCESS = 'HIDE_ENTRY_SUCCESS';
export const HIDE_ENTRY_FAILURE = 'HIDE_ENTRY_FAILURE';

export const DELETE_ENTRY_SUCCESS = 'DELETE_ENTRY_SUCCESS';
export const DELETE_ENTRY_FAILURE = 'DELETE_ENTRY_FAILURE';

export const SEARCH_ENTRIES_SUCCESS = 'SEARCH_ENTRIES_SUCCESS';
export const SEARCH_ENTRIES_FAILURE = 'SEARCH_ENTRIES_FAILURE ';
export const CLEAR_SEARCH = 'CLEAR_SEARCH';

// actions

export const fetchEntriesSuccess = journal => {
  return { type: FETCH_ENTRIES_SUCCESS, journal };
};

export const fetchEntriesFailure = error => {
  return { type: FETCH_ENTRIES_FAILURE, error };
};

export const createEntrySucess = journal => {
  return { type: CREATE_ENTRY_SUCESS, journal };
};

export const createEntryFailure = error => {
  return { type: CREATE_ENTRY_FAILURE, error };
};

export const toggleUserIsCreatingEntry = () => {
  return { type: TOGGLE_USER_IS_CREATING_ENTRY };
};

export const toggleShowHiddenEntries = () => {
  return { type: TOGGLE_SHOW_HIDDEN_ENTRIES };
};

export const goToEntryPage = entry => {
  return { type: GO_TO_ENTRY_PAGE, entry };
};

export const goToHistoryPage = journal => {
  return { type: GO_TO_HISTORY_PAGE, journal };
};

export const goToHistoryEntryPage = entry => {
  return { type: GO_TO_HISTORY_ENTRY_PAGE, entry };
};

export const hideEntrySucess = entry => {
  return { type: HIDE_ENTRY_SUCCESS, entry };
};

export const hideEntryFailure = error => {
  return { type: HIDE_ENTRY_FAILURE, error };
};

export const deleteEntrySucess = entry => {
  return { type: DELETE_ENTRY_SUCCESS, entry };
};

export const deleteEntryFailure = error => {
  return { type: DELETE_ENTRY_FAILURE, error };
};

export const searchEntriesSuccess = entries => {
  return { type: SEARCH_ENTRIES_SUCCESS, entries };
};

export const searchEntriesFailure = err => {
  return { type: SEARCH_ENTRIES_FAILURE, err };
};

export const clearSearch = () => {
  return { type: CLEAR_SEARCH };
};

// async

export const fetchEntries = () => dispatch => {
  const id = window.location.href.split('/')[5];
  request
    .fetchAuth(`${BASE_URL}/api/journal/${id}`, 'GET')
    .then(res => {
      if (res.status > 400) throw new Error(res.data);
      dispatch(fetchEntriesSuccess(res.data));
    })
    .catch(err => {
      dispatch(fetchEntriesFailure(err));
    });
};

export const createEntry = params => dispatch => {
  const id = window.location.href.split('/')[5];
  request
    .fetchAuth(`${BASE_URL}/api/journal/${id}/entry`, 'POST', params)
    .then(res => {
      if (res.status > 400) throw new Error(res.data);
      dispatch(createEntrySucess(res.data));
      dispatch(toggleUserIsCreatingEntry());
    })
    .catch(err => {
      dispatch(createEntryFailure(err));
    });
};

export const hideEntry = entry => dispatch => {
  const id = window.location.href.split('/')[5];

  request
    .fetchAuth(`${BASE_URL}/api/journal/${id}/entry/${entry.id}`, 'PUT', entry)
    .then(res => {
      if (res.status > 400) throw new Error(res.data);
      dispatch(hideEntrySucess(res.data));
    })
    .catch(err => {
      dispatch(hideEntryFailure(err));
    });
};

export const deleteEntry = entry => dispatch => {
  const id = window.location.href.split('/')[5];
  request
    .fetchAuth(`${BASE_URL}/api/journal/${id}/entry/${entry.id}`, 'DELETE', entry)
    .then(res => {
      if (res.status > 400) throw new Error(res.data);
      dispatch(deleteEntrySucess(res.data));
    })
    .catch(err => {
      dispatch(deleteEntryFailure(err));
    });
};

export const searchEntries = query => dispatch => {
  const id = window.location.href.split('/')[5];

  request
    .fetchAuth(`${BASE_URL}/api/journal/${id}/search`, 'POST', query)
    .then(res => {
      if (res.status > 400) throw new Error(res.data);
      dispatch(searchEntriesSuccess(res.data));
    })
    .catch(err => {
      dispatch(searchEntriesFailure(err));
    });
};
