import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

// components
import Login from '../Login';
import Admin from '../Admin';

const App = () => (
  <Fragment>
    <Route path='/login' component={Login} />
    <Route path='/admin' component={Admin} />
  </Fragment>
);

export default App;
