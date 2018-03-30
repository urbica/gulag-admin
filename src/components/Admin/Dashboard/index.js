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

// component
import Dashboard from './Dashboard';

const mapStateToProps = createSelector(
  campsSelector,
  placesSelector,
  typesSelector,
  periodsSelector,
  (camps, places, types, periods) => {
    const { publishedRuCount, publishedEnCount, publishedDeCount } = camps.reduce(
      (acc, camp) => {
        /* eslint-disable no-param-reassign */
        if (camp.getIn(['published', 'ru'])) acc.publishedRuCount += 1;
        if (camp.getIn(['published', 'en'])) acc.publishedEnCount += 1;
        if (camp.getIn(['published', 'de'])) acc.publishedDeCount += 1;
        /* eslint-enable no-param-reassign */
        return acc;
      },
      { publishedRuCount: 0, publishedEnCount: 0, publishedDeCount: 0 }
    );

    return {
      camps,
      places,
      types,
      periods: periods.sort((a, b) => a.get('id') > b.get('id')),
      publishedRuCount,
      publishedEnCount,
      publishedDeCount
    };
  }
);

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  createCamp: () => dispatch(createCamp()),
  openCamp: id => dispatch(push(`/admin/camp${id}`)),
  openChronology: () => dispatch(push('/admin/chronology'))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
