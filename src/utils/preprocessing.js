import { assoc, compose, map, prop, reduce, values } from 'ramda';
import { pickByRegExp } from './utils';

export const getMaxPrisoners = (prison) => {
  const getMaxPrisoners = compose(
    reduce(Math.max, 0),
    values,
    map(prop('peoples')),
    pickByRegExp(/^\d{4}$/),
    prop('properties')
  );

  const maxPrisoners = reduce((acc, feature) => {
    return Math.max(acc, getMaxPrisoners(feature));
  }, 0, prison.features);

  return assoc('max_prisoners', maxPrisoners, prison);
}


export const fillMaxPrisoners = (prisons) => {
  return map(getMaxPrisoners, prisons);
}
