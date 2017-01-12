import { curryN, assoc, compose, map, merge, prop, reduce, toPairs, values } from 'ramda';
import { renameKeys, pickByRegExp } from './utils';

export const getMaxPrisoners = (prison) => {
  const features = prison.features || [];

  const getMaxPrisoners = compose(
    reduce(Math.max, 0),
    values,
    map(prop('peoples')),
    pickByRegExp(/^\d{4}$/),
    prop('properties')
  );

  const maxPrisoners = reduce((acc, feature) => {
    return Math.max(acc, getMaxPrisoners(feature));
  }, 0, features);

  return assoc('max_prisoners', maxPrisoners, prison);
}

export const fillMaxPrisoners = (prisons) => {
  return map(getMaxPrisoners, prisons);
}

export const fillPhotos = curryN(3, (photosById, backendUrl, prisons) => {
  return reduce((acc, [prisonId, photos]) => {
    acc[prisonId].photos = map(photo => merge(photo, {
      path: `${backendUrl}/${photo.path}`
    }), photos);
    return acc;
  }, prisons, toPairs(photosById));
});

export const directoryToOptions = map(renameKeys({ id: 'value', name: 'label' }));
