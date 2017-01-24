import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import App from './components/App/App';
import LoginPage from './components/LoginPage/LoginPage.jsx';
import IndexPage from './components/IndexPage/IndexPage.jsx';
import PrisonPage from './components/PrisonPage/PrisonPage.jsx';
import { Router, Route, IndexRedirect, IndexRoute, browserHistory } from 'react-router'

// if (module.hot) {
//   module.hot.accept()
// }

ReactDOM.render(
  <Router history={ browserHistory }>
    <Route path='/' component={ App }>
      <IndexRedirect to='/admin'/>
      <Route path='login' component={ LoginPage }/>
      <Route path='admin'>
        <IndexRoute component={ IndexPage }/>
        <Route path='prisons' component={ IndexPage }/>
        <Route path='prisons/:prisonId' component={ PrisonPage }/>
      </Route>
    </Route>
  </Router>,
  document.getElementById('root')
);