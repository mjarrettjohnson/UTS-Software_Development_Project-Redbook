import ErrorHandler from '../utils/error-handler';
import * as types from '../actions/entry.actions';

const fetchEntrySuccess = (state, entry) => {
  return {
    ...state,
    current: entry,
    isEditing: false,
    selectedVersion: entry.versions[entry.versions.length - 1],
  };
};

const handleError = (state, error) => {
  return {
    ...state,
    isLoggedIn: false,
    error: ErrorHandler.handle(error),
  };
};

const toggleAuthorIsEditingEntry = state => {
  return {
    ...state,
    isEditing: !state.isEditing,
  };
};

const updateEntrySuccess = (state, entry) => {
  // update the entry and set the selected version to be the latest

  return selectVersionById(
    {
      ...state,
      current: entry,
      isEditing: false,
    },
    entry.versions[entry.versions.length - 1].id
  );
};

const selectVersionById = (state, id) => {
  const selected = state.current.versions.filter(version => version.id === id)[0];
  return {
    ...state,
    selectedVersion: selected,
  };
};

export default function entry(state = {}, action) {
  switch (action.type) {
    case types.FETCH_ENTRY_SUCCESS:
      return fetchEntrySuccess(state, action.entry);
    case types.FETCH_ENTRY_ERROR:
      return handleError(state, action.error);
    case types.TOGGLE_AUTHOR_IS_EDITING_ENTRY:
      return toggleAuthorIsEditingEntry(state);
    case types.UPDATE_ENTRY_SUCCESS:
      return updateEntrySuccess(state, action.entry);
    case types.UPDATE_ENTRY_FAILURE:
      return handleError(state, action.error);
    case types.SELECT_VERSION_BY_ID:
      return selectVersionById(state, action.id);
    default:
      return state;
  }
}
