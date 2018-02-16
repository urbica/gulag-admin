import { createSelector } from 'reselect';

export const campsSelector = state => state.getIn(['data', 'camps']);
export const activitiesSelector = state => state.getIn(['data', 'activities']);
export const placesSelector = state => state.getIn(['data', 'places']);
export const typesSelector = state => state.getIn(['data', 'types']);
export const photosSelector = state => state.getIn(['data', 'uploads']);
export const notesSelector = state => state.getIn(['data', 'notes']);

export const currentIdSelector = (state, { match }) => match.params.id;

export const currentCampSelector = createSelector(
  campsSelector,
  currentIdSelector,
  (camps, id) => camps.find(camp => camp.get('id') === parseInt(id, 10))
);

export const currentCampPhotosSelector = createSelector(
  photosSelector,
  currentIdSelector,
  (photos, id) => photos.filter(photo => photo.get('camp_id') === parseInt(id, 10))
);

export const currentNotesSelector = createSelector(
  notesSelector,
  currentIdSelector,
  (notes, id) => notes.find(note => note.get('prison_id') === parseInt(id, 10))
);
