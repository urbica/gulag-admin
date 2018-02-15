import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

// components
import Login from '../Login/Login';
import Admin from '../Admin/Admin';

const App = () => (
  <Fragment>
    <Route path='/login' component={Login} />
    <Route path='/admin' component={Admin} />
  </Fragment>
);

export default App;
