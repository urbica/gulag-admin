import React, { PropTypes } from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ path, component: Component, isAuthenticated, ...rest }) => {
  const render = (props) => {
    if (isAuthenticated) {
      return <Component {...props} {...rest} />;
    }

    const location = {
      pathname: '/login',
      state: {
        from: props.location
      }
    };

    return <Redirect to={location} />;
  };

  return <Route path={path} render={render} />;
};

PrivateRoute.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

export default PrivateRoute;
