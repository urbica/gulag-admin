import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

const PublicRoute = ({ path, component: Component, ...rest }) => (
  <Route path={path} render={props => <Component {...props} {...rest} />} />
);

PublicRoute.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired
};

export default PublicRoute;
