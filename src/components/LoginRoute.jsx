import React, { PropTypes } from 'react';
import { Route, Redirect } from 'react-router-dom';

import LoginPage from './LoginPage';

const LoginRoute = ({ isAuthenticated, component, ...rest }) => {
  const render = (props) => {
    if (!isAuthenticated) {
      return <LoginPage {...rest} />;
    }

    const location = {
      pathname: '/admin',
      state: {
        from: props.location
      }
    };

    return <Redirect to={location} />;
  };
  return <Route {...rest} render={render} />;
};

LoginRoute.propTypes = {};

export default LoginRoute;
