import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { routerMiddleware, routerReducer, ConnectedRouter } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import { applyMiddleware, createStore } from 'redux';
import { combineReducers } from 'redux-immutable';

import './globalStyles';
import App from './components/App/App';
import Saga from './components/App/saga';

// reducers
import authReducer from './components/App/authReducer';
import uiReducer from './components/App/uiReducer';
import dataReducer from './components/App/dataReducer';

let middleware;
const sagaMiddleware = createSagaMiddleware();
const history = createHistory();
const routersMiddleware = routerMiddleware(history);


if (process.env.NODE_ENV === 'development') {
  const loggerMiddleware = createLogger({
    collapsed: true,
    stateTransformer: state => state.toJS()
  });

  middleware = applyMiddleware(sagaMiddleware, routersMiddleware, loggerMiddleware);
} else {
  middleware = applyMiddleware(sagaMiddleware, routersMiddleware);
}

const reducer = combineReducers({
  router: routerReducer,
  auth: authReducer,
  ui: uiReducer,
  data: dataReducer
});


const store = createStore(reducer, middleware);
sagaMiddleware.run(Saga);

const root = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  root
);
