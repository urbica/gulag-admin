import { createSelector } from 'reselect';
import { Map } from 'immutable';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

import { periodsSelector } from '../../App/dataSelectors';
import { createPeriod, deletePeriod, updatePeriods } from '../../App/dataReducer';

import Chronology from './Chronology';

const mapStateToProps = () =>
  createSelector(periodsSelector, periods => ({
    periods: periods
      .reduce((acc, period) => acc.set(period.get('id'), period), Map())
      .sort((a, b) => a.get('id') > b.get('id'))
  }));

const mapDispatchToProps = dispatch => ({
  pushToDashboard: () => dispatch(push('/admin')),
  createPeriod: () => dispatch(createPeriod()),
  deletePeriod: id => dispatch(deletePeriod(id)),
  updatePeriods: periods => dispatch(updatePeriods(periods))
});

export default connect(mapStateToProps, mapDispatchToProps)(Chronology);
