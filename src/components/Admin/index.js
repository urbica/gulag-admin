import { connect } from 'react-redux';
import { createSelector } from 'reselect';

// selectors
import tokenSelector from '../App/authSelector';

// actions
import { fetchData } from '../App/dataReducer';

import Admin from './Admin';

const mapStateToProps = createSelector(
  tokenSelector,
  state => state.getIn(['ui', 'isDataLoaded']),
  (token, isDataLoaded) => ({ token, isDataLoaded })
);

const mapDispatchToProps = dispatch => ({
  fetchData: () => dispatch(fetchData())
});

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
