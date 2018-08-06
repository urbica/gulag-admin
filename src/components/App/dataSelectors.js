import { createSelector } from 'reselect';
import createImmutableSelector from 'create-immutable-selector';
import { List } from 'immutable';

import { searchQuerySelector } from './uiSelectors';

const dataSelector = state => state.get('data');

export const campsSelector = createImmutableSelector(dataSelector, data => {
  const camps = data.get('camps');

  return camps.reduce((acc, camp) => {
    const locations = camp.get('locations') || List();
    const value = locations.reduce((locAcc, location) => {
      const maxValue = location
        .get('statistics')
        .reduce(
          (maxVal, val) =>
            val.get('prisonersCount') > maxVal
              ? val.get('prisonersCount')
              : maxVal,
          0
        );

      return locAcc > maxValue ? locAcc : maxValue;
    }, 0);

    const campWithMaxPrisoners = camp.set('max_prisoners', value);

    return acc.push(campWithMaxPrisoners);
  }, List());
});
export const periodsSelector = state => state.getIn(['data', 'periods']);
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
  (photos, id) =>
    photos.filter(photo => photo.get('camp_id') === parseInt(id, 10))
);

export const currentNotesSelector = createSelector(
  notesSelector,
  currentIdSelector,
  (notes, id) => notes.find(note => note.get('prison_id') === parseInt(id, 10))
);

export const filteredCampsSelector = createImmutableSelector(
  campsSelector,
  searchQuerySelector,
  (camps, searchQuery) => {
    if (searchQuery.length > 0) {
      return camps.filter(camp => {
        const searchString = [
          camp.get('id'),
          camp.getIn(['title', 'ru']),
          camp.getIn(['title', 'en']),
          camp.getIn(['subTitles', 'ru']),
          camp.getIn(['subTitles', 'en']),
          camp.get('max_prisoners')
        ]
          .join(' ')
          .toLowerCase();

        return searchString.match(searchQuery.trim().toLowerCase());
      });
    }

    return camps;
  }
);
