import createImmutableSelector from 'create-immutable-selector';
import { connect } from 'react-redux';

// selectors
import { filteredCampsSelector } from '../../../App/dataSelectors';
import {
  campsSortASCSelector,
  campsSortBySelector
} from '../../../App/uiSelectors';

// component
import Camps from './Camps';

const mapStateToProps = createImmutableSelector(
  filteredCampsSelector,
  campsSortASCSelector,
  campsSortBySelector,
  (filteredCamps, campsSortASC, campsSortBy) => ({
    filteredCamps,
    campsSortASC,
    campsSortBy
  })
);

export default connect(mapStateToProps)(Camps);
