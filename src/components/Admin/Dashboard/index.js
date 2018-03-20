import { push } from 'react-router-redux';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';

// selectors
import {
  campsSelector,
  placesSelector,
  typesSelector,
  periodsSelector
} from '../../App/dataSelectors';

// actions
import { logout } from '../../App/authReducer';
import { createCamp } from '../../App/dataReducer';

import Dashboard from './Dashboard';

const mapStateToProps = createSelector(
  campsSelector,
  placesSelector,
  typesSelector,
  periodsSelector,
  (camps, places, types, periods) => ({
    camps,
    places,
    types,
    periods
  })
);

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  createCamp: () => dispatch(createCamp()),
  openCamp: id => dispatch(push(`/admin/camp${id}`)),
  openChronology: () => dispatch(push('/admin/chronology'))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
