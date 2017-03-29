import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ isAuthenticated, component, ...rest }) => {
  const render = (props) => {
    if (isAuthenticated) {
      return React.createElement(component, rest);
    }

    const location = {
      pathname: '/login',
      state: {
        from: props.location
      }
    };

    return <Redirect to={location} />;
  };
  return <Route {...rest} render={render} />;
};

export default PrivateRoute;
