import { connect } from 'react-redux';
import { createSelector } from 'reselect';

// selectors
import {
  currentCampSelector,
  currentCampPhotosSelector,
  activitiesSelector,
  placesSelector,
  typesSelector
} from '../../App/dataSelectors';

// actions
import { updateCamp, deleteCamp } from '../../App/dataReducer';

import Camp from './Camp';

const toOptions = list =>
  list
    .map(option => ({
      value: option.get('id'),
      label: option.getIn(['title', 'ru'])
    }))
    .toJS();

const mapStateToProps = createSelector(
  currentCampSelector,
  currentCampPhotosSelector,
  activitiesSelector,
  placesSelector,
  typesSelector,
  (camp, photos, activities, places, types) => ({
    camp,
    photos,
    activitiesOptions: toOptions(activities),
    placesOptions: toOptions(places),
    typesOptions: toOptions(types)
  })
);

const mapDispatchToProps = dispatch => ({
  updateCamp: newCamp => dispatch(updateCamp(newCamp)),
  deleteCamp: campId => dispatch(deleteCamp(campId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Camp);
