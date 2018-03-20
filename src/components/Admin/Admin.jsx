import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';
import { createSelector } from 'reselect';

import { fetchData } from '../App/dataReducer';

import tokenSelector from '../App/authSelector';
import { campsSelector } from '../App/dataSelectors';

// components
import Dashboard from './Dashboard';
import Camp from './Camp/Camp';
import Chronology from './Chronology';

class Admin extends PureComponent {
  componentDidMount() {
    if (!this.props.periods) {
      this.props.dispatch(fetchData());
    }
  }

  render() {
    const { token /* , camps */ } = this.props;

    if (!token) {
      return <Redirect to='/login' />;
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
  periods: PropTypes.object,
  dispatch: PropTypes.func.isRequired
};

Admin.defaultProps = {
  token: null,
  periods: null
};

const selector = createSelector(tokenSelector, campsSelector, (token, camps) => ({
  token,
  camps
}));

export default connect(selector)(Admin);
