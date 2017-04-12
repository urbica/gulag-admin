import React, { PropTypes } from 'react';
import { Route } from 'react-router-dom';

const PublicRoute = ({ path, component: Component, ...rest }) => (
  <Route path={path} render={props => <Component {...props} {...rest} />} />
);

PublicRoute.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired
};

export default PublicRoute;
