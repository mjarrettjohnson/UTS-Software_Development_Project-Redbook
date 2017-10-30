import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Router, Route, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import reducers from './reducers/combineReducers';
import { DashboardContainer } from './containers/dashboard.container';
import { JournalContainer } from './containers/journal.container';
import { AuthContainer } from './containers/auth.container';
import { EntryContainer } from './containers/entry.container';
import { HistoryContainer } from './containers/history.container';

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

const routes = (
  <Route component={App}>
    <Route path="/" component={DashboardContainer} />
    <Route path="/login" component={AuthContainer} />
    <Route path="/register" component={AuthContainer} />
    <Route path="/journal/*/entry/*" component={EntryContainer} />
    <Route path="/journal/*" component={JournalContainer} />
    <Route path="/history/*/entry/*" component={EntryContainer} />
    <Route path="/history/*" component={HistoryContainer} />
  </Route>
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
