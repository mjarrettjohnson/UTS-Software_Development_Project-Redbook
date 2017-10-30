import * as request from '../utils/request';
import BASE_URL from '../utils/base-url';

// action types

export const JOURNAL_CREATE_SUCCESS = 'JOURNAL_CREATE_SUCCESS';
export const JOURNAL_CREATE_ERROR = 'JOURNAL_CREATE_ERROR';
export const JOURNAL_FETCH_SUCCESS = 'JOURNAL_FETCH_SUCCESS';
export const JOURNAL_FETCH_ERROR = 'JOURNAL_FETCH_ERROR';
export const TOGGLE_USER_IS_CREATING_JOURNAL = 'TOGGLE_USER_IS_CREATING_JOURNAL';
export const GO_TO_JOURNAL_PAGE = 'GO_TO_JOURNAL_PAGE';

// actions

export const journalCreateSuccess = journal => {
  return { type: JOURNAL_CREATE_SUCCESS, journal };
};

export const journalCreateError = error => {
  return { type: JOURNAL_CREATE_ERROR, error };
};

export const journalFetchSuccess = journals => {
  return { type: JOURNAL_FETCH_SUCCESS, journals };
};

export const journalFetchError = error => {
  return { type: JOURNAL_FETCH_ERROR, error };
};

export const toggleUserIsCreatingJournal = () => {
  return { type: TOGGLE_USER_IS_CREATING_JOURNAL };
};

export const goToJournalPage = journal => {
  return { type: GO_TO_JOURNAL_PAGE, journal };
};

// thunks

export const createJournal = params => dispatch => {
  request
    .fetchAuth(`${BASE_URL}/api/journals`, 'POST', params)
    .then(res => {
      if (res.status > 400) throw new Error(res.data);
      dispatch(journalCreateSuccess(res.data));
      dispatch(toggleUserIsCreatingJournal());
    })
    .catch(err => {
      dispatch(journalCreateError(err));
    });
};

export const fetchJournals = params => dispatch => {
  request
    .fetchAuth(`${BASE_URL}/api/journals`, 'GET', params)
    .then(res => {
      if (res.status > 400) throw new Error(res.data);
      dispatch(journalFetchSuccess(res.data));
    })
    .catch(err => {
      dispatch(journalFetchError(err));
    });
};
