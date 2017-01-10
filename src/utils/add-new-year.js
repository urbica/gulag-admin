import {compose, lensIndex, lensPath, set, dissoc, lensProp, over} from 'ramda';

function addNewYear(state, prisonId, locationId, year) {
  const PRISON = state.prisons[prisonId];

  const LENS = compose(
    lensPath(['prisons', prisonId, 'features']),
    lensIndex(locationId),
    lensPath(['properties', year, 'peoples'])
  );
  const LENS_REMOVE = compose(
    lensPath(['prisons', prisonId, 'features']),
    lensIndex(locationId),
    lensProp('properties')
  );

  const NEW_STATE_ADD = set(LENS, 0, state);
  const NEW_STATE_REMOVE = over(LENS_REMOVE, dissoc(year), state);

  if (!PRISON.features[locationId].properties[year]) {
    return(NEW_STATE_ADD)
  } else {
    return(NEW_STATE_REMOVE)
  }
}

export default addNewYear;