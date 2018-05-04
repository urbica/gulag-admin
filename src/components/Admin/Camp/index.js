import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { List } from 'immutable';

// selectors
import {
  currentCampSelector,
  currentCampPhotosSelector,
  activitiesSelector,
  placesSelector,
  typesSelector
} from '../../App/dataSelectors';

// actions
import {
  updateCamp,
  deleteCamp,
  deleteCampStat,
  deleteCampLocation,
  uploadPhotos,
  deletePhoto
} from '../../App/dataReducer';

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
    camp: camp.update('locations', locations => {
      if (locations === null || locations === undefined) return List();

      return locations.sort((a, b) => {
        if (a.get('orderIndex') > b.get('orderIndex')) return 1;
        if (a.get('orderIndex') < b.get('orderIndex')) return -1;
        return 0;
      });
    }),
    photos,
    activitiesOptions: toOptions(activities),
    placesOptions: toOptions(places),
    typesOptions: toOptions(types)
  })
);

const mapDispatchToProps = dispatch => ({
  updateCamp: newCamp => dispatch(updateCamp(newCamp)),
  deleteCamp: campId => dispatch(deleteCamp(campId)),
  deleteCampStat: (statId, campId) => dispatch(deleteCampStat(statId, campId)),
  deleteCampLocation: id => dispatch(deleteCampLocation(id)),
  uploadPhotos: (campId, photos) => dispatch(uploadPhotos(campId, photos)),
  deletePhoto: (campId, photoId) => dispatch(deletePhoto(campId, photoId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Camp);
