import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import App from './components/App/App';
import LoginPage from './components/LoginPage/LoginPage';
import IndexPage from './components/IndexPage/IndexPage';
import PrisonPage from './components/PrisonPage/PrisonPage';
import { Router, Route, IndexRedirect, IndexRoute, browserHistory } from 'react-router'

ReactDOM.render(
  <Router history={ browserHistory }>
    <Route path='/' component={ App }>
      <IndexRedirect to='/admin' />
      <Route path='login' component={ LoginPage }/>
      <Route path='admin'>
        <IndexRoute component={ IndexPage } />
        <Route path='prisons' component={ IndexPage }/>
        <Route path='prisons/:prisonId' component={ PrisonPage }/>
      </Route>
    </Route>
  </Router>,
  document.getElementById('root')
);
