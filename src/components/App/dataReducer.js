import { Map } from 'immutable';

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

export const fetchData = () => ({ type: DATA_FETCH_REQUEST });
export const createCamp = () => ({ type: CREATE_CAMP_REQUEST });
export const updateCamp = newCamp => ({ type: UPDATE_CAMP_REQUEST, payload: newCamp });
export const deleteCamp = campId => ({ type: DELETE_CAMP_REQUEST, payload: campId });
export const uploadPhotos = (prisonId, photos) => ({
  type: UPLOAD_PHOTOS_REQUEST,
  payload: { prisonId, photos }
});
export const deletePhoto = photoId => ({ type: DELETE_PHOTO_REQUEST, payload: photoId });

const initialState = Map({
  camps: Map(),
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
    case UPDATE_CAMP_SUCCESS:
      return state;
    case DELETE_CAMP_SUCCESS:
      console.log('dataReducer payload', payload);
      return state;
    case UPLOAD_PHOTOS_SUCCESS:
      console.log('dataReducer payload', payload);
      return state;
    case DELETE_PHOTO_SUCCESS:
      console.log('dataReducer payload', payload);
      return state;
    default:
      return state;
  }
};
