import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, /* Redirect, */ Switch } from 'react-router-dom';
import { createSelector } from 'reselect';

import { fetchData } from '../App/dataReducer';

import tokenSelector from '../App/authSelector';
import { campsSelector } from '../App/dataSelectors';

// components
import Dashboard from './Dashboard/Dashboard';
import Camp from './Camp/Camp';
import Period from './Period/Period';

class Admin extends PureComponent {
  componentDidMount() {
    if (!this.props.camps) {
      this.props.dispatch(fetchData());
    }
  }

  render() {
    // const { token, camps } = this.props;

    // if (!token) {
    //   return <Redirect to='/login' />;
    // }

    return (
      <Switch>
        <Route exact path='/' component={Dashboard} />
        <Route exact path='/camp:id' component={Camp} />
        <Route exact path='/chronology' component={Period} />
      </Switch>
    );
  }
}

Admin.propTypes = {
  // token: PropTypes.string,
  camps: PropTypes.object,
  dispatch: PropTypes.func.isRequired
};

Admin.defaultProps = {
  // token: null,
  camps: null
};

const selector = createSelector(
  tokenSelector,
  campsSelector,
  (token, camps) => ({
    token,
    camps
  })
);

export default connect(selector)(Admin);
