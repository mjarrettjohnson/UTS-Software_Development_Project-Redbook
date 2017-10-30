import { combineReducers } from 'redux';
import auth from './auth.reducer';
import dashboard from './dashboard.reducer';
import journal from './journal.reducer';
import entry from './entry.reducer';
const rootReducer = combineReducers({
  auth,
  dashboard,
  journal,
  entry,
});

export default rootReducer;
