import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, Switch } from 'react-router-dom';

// components
import Dashboard from './Dashboard';
import Camp from './Camp/Camp';
import Chronology from './Chronology';

class Admin extends PureComponent {
  componentDidMount() {
    const { isDataLoaded, fetchData } = this.props;

    if (!isDataLoaded) {
      fetchData();
    }
  }

  render() {
    const { token, isDataLoaded } = this.props;

    if (!token) {
      return <Redirect to='/login' />;
    }

    if (!isDataLoaded) {
      return null;
    }

    return (
      <Switch>
        <Route exact path='/admin' component={Dashboard} />
        <Route exact path='/admin/camp:id' component={Camp} />
        <Route exact path='/admin/chronology' component={Chronology} />
      </Switch>
    );
  }
}

Admin.propTypes = {
  token: PropTypes.string,
  fetchData: PropTypes.func.isRequired,
  isDataLoaded: PropTypes.bool.isRequired
};

Admin.defaultProps = {
  token: null
};

export default Admin;
