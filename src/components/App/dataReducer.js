import { List, Map } from 'immutable';

export const DATA_FETCH_REQUEST = 'DATA_FETCH_REQUEST';
export const DATA_FETCH_SUCCESS = 'DATA_FETCH_SUCCESS';
export const DATA_FETCH_FAILURE = 'DATA_FETCH_FAILURE';
export const CREATE_CAMP_REQUEST = 'CREATE_CAMP_REQUEST';
export const CREATE_CAMP_SUCCESS = 'CREATE_CAMP_SUCCESS';
export const CREATE_CAMP_FAILURE = 'CREATE_CAMP_FAILURE';
export const UPDATE_CAMP_REQUEST = 'UPDATE_CAMP_REQUEST';
export const UPDATE_CAMP_SUCCESS = 'UPDATE_CAMP_SUCCESS';
export const UPDATE_CAMP_FAILURE = 'UPDATE_CAMP_FAILURE';
export const DELETE_CAMP_REQUEST = 'DELETE_CAMP_REQUEST';
export const DELETE_CAMP_SUCCESS = 'DELETE_CAMP_SUCCESS';
export const DELETE_CAMP_FAILURE = 'DELETE_CAMP_FAILURE';
export const UPLOAD_PHOTOS_REQUEST = 'UPLOAD_PHOTOS_REQUEST';
export const UPLOAD_PHOTOS_SUCCESS = 'UPLOAD_PHOTOS_SUCCESS';
export const UPLOAD_PHOTOS_FAILURE = 'UPLOAD_PHOTOS_FAILURE';
export const DELETE_PHOTO_REQUEST = 'DELETE_PHOTO_REQUEST';
export const DELETE_PHOTO_SUCCESS = 'DELETE_PHOTO_SUCCESS';
export const DELETE_PHOTO_FAILURE = 'DELETE_PHOTO_FAILURE';
export const CREATE_PERIOD_REQUEST = 'CREATE_PERIOD_REQUEST';
export const CREATE_PERIOD_SUCCESS = 'CREATE_PERIOD_SUCCESS';
export const CREATE_PERIOD_FAILURE = 'CREATE_PERIOD_FAILURE';
export const DELETE_PERIOD_REQUEST = 'DELETE_PERIOD_REQUEST';
export const DELETE_PERIOD_SUCCESS = 'DELETE_PERIOD_SUCCESS';
export const DELETE_PERIOD_FAILURE = 'DELETE_PERIOD_FAILURE';
export const UPDATE_PERIODS_REQUEST = 'UPDATE_PERIODS_REQUEST';
export const UPDATE_PERIODS_SUCCESS = 'UPDATE_PERIODS_SUCCESS';
export const UPDATE_PERIODS_FAILURE = 'UPDATE_PERIODS_FAILURE';
export const DELETE_CAMP_STAT_REQUEST = 'DELETE_CAMP_STAT_REQUEST';
export const DELETE_CAMP_STAT_SUCCESS = 'DELETE_CAMP_STAT_SUCCESS';
export const DELETE_CAMP_STAT_FAILURE = 'DELETE_CAMP_STAT_FAILURE';
export const DELETE_CAMP_LOCATION_REQUEST = 'DELETE_CAMP_LOCATION_REQUEST';
export const DELETE_CAMP_LOCATION_SUCCESS = 'DELETE_CAMP_LOCATION_SUCCESS';
export const DELETE_CAMP_LOCATION_FAILURE = 'DELETE_CAMP_LOCATION_FAILURE';

export const fetchData = () => ({ type: DATA_FETCH_REQUEST });
export const createCamp = () => ({ type: CREATE_CAMP_REQUEST });
export const updateCamp = newCamp => ({
  type: UPDATE_CAMP_REQUEST,
  payload: newCamp
});
export const deleteCamp = campId => ({
  type: DELETE_CAMP_REQUEST,
  payload: campId
});
export const uploadPhotos = (prisonId, photos) => ({
  type: UPLOAD_PHOTOS_REQUEST,
  payload: { prisonId, photos }
});
export const deletePhoto = (campId, photoId) => ({
  type: DELETE_PHOTO_REQUEST,
  payload: { campId, photoId }
});
export const createPeriod = () => ({ type: CREATE_PERIOD_REQUEST });
export const deletePeriod = periodId => ({
  type: DELETE_PERIOD_REQUEST,
  payload: periodId
});
export const updatePeriods = periods => ({
  type: UPDATE_PERIODS_REQUEST,
  payload: periods
});
export const deleteCampStat = (id, campId) => ({
  type: DELETE_CAMP_STAT_REQUEST,
  payload: { id, campId }
});
export const deleteCampLocation = id => ({
  type: DELETE_CAMP_LOCATION_REQUEST,
  payload: id
});

const initialState = Map({
  camps: List(),
  uploads: Map(),
  activities: Map(),
  places: Map(),
  types: Map(),
  periods: Map(),
  notes: Map()
});

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case DATA_FETCH_SUCCESS:
      return state.merge(payload);
    case CREATE_CAMP_SUCCESS:
      return state.update('camps', camps => camps.push(payload));
    case UPDATE_CAMP_SUCCESS: {
      const newCamps = state
        .get('camps')
        .map(camp => (camp.get('id') === payload.get('id') ? payload : camp));

      return state.set('camps', newCamps);
    }
    case DELETE_CAMP_SUCCESS: {
      const newCamps = state
        .get('camps')
        .filter(camp => camp.get('id') !== payload);
      return state.set('camps', newCamps);
    }
    case UPLOAD_PHOTOS_SUCCESS: {
      const newCamps = state
        .get('camps')
        .map(
          camp =>
            camp.get('id') === payload.get('campId')
              ? camp.update('photos', photos => photos.push(payload))
              : camp
        );

      return state.set('camps', newCamps);
    }
    case DELETE_PHOTO_SUCCESS: {
      const newCamps = state
        .get('camps')
        .map(
          camp =>
            camp.get('id') !== payload.campId
              ? camp
              : camp.update('photos', photos =>
                  photos.filter(photo => photo.get('id') !== payload.photoId))
        );

      return state.set('camps', newCamps);
    }
    case CREATE_PERIOD_SUCCESS:
      return state.update('periods', periods => periods.push(payload));
    case DELETE_PERIOD_SUCCESS: {
      const newPeriods = state
        .get('periods')
        .filter(period => period.get('id') !== payload);
      return state.set('periods', newPeriods);
    }
    case UPDATE_PERIODS_SUCCESS:
      return state.set('periods', payload);
    case DELETE_CAMP_STAT_SUCCESS: {
      const updatedCamps = state.get('camps').map(camp => {
        if (camp.get('id') === payload.campId) {
          const updatedLocations = camp.get('locations').map(location => {
            if (location.get('id') === payload.campLocationId) {
              const filteredStatistics = location
                .get('statistics')
                .filter(stat => stat.get('id') !== payload.statId);
              return location.set('statistics', filteredStatistics);
            }
            return location;
          });
          return camp.set('locations', updatedLocations);
        }
        return camp;
      });
      return state.set('camps', updatedCamps);
    }
    case DELETE_CAMP_LOCATION_SUCCESS: {
      const updatedCamps = state.get('camps').map(camp => {
        if (camp.get('id') === payload.campId) {
          const filteredLocations = camp
            .get('locations')
            .filter(location => location.get('id') !== payload.locationId);

          return camp.set('locations', filteredLocations);
        }
        return camp;
      });
      return state.set('camps', updatedCamps);
    }
    default:
      return state;
  }
};
