import { createSelector } from 'reselect';
import { connect } from 'react-redux';

// selectors
import { searchQuerySelector } from '../../../App/uiSelectors';

// actions
import { changeSearchQuery } from '../../../App/uiReducer';

// component
import Search from './Search';

const mapStateToProps = createSelector(
  searchQuerySelector,
  (searchQuery) => ({ searchQuery })
);

export default connect(mapStateToProps, { changeSearchQuery })(Search);
