/* eslint-disable no-shadow */
import {
  __,
  apply,
  compose,
  curry,
  flatten,
  gt,
  head,
  ifElse,
  keys,
  length,
  map,
  min,
  nthArg,
  pickBy,
  pipe,
  prop,
  test,
  uncurryN,
  or,
  reduce,
  values,
  assoc
} from 'ramda';

export const renameKeys = curry((keysMap, obj) =>
  reduce(
    (acc, key) => {
      acc[keysMap[key] || key] = obj[key];
      return acc;
    },
    {},
    keys(obj)
  ));

export const pickByRegExp = uncurryN(2, RegExp => pickBy(compose(test(RegExp), nthArg(1))));

export const getMaxPrisoners = (prison) => {
  const features = prison.features || [];

  const getMaxPrisoners = compose(
    reduce(Math.max, 0),
    values,
    map(prop('peoples')),
    pickByRegExp(/^\d{4}$/),
    prop('properties')
  );

  const maxPrisoners = reduce(
    (acc, feature) => Math.max(acc, getMaxPrisoners(feature)),
    0,
    features
  );

  return assoc('max_prisoners', maxPrisoners, prison);
};

export const fillMaxPrisoners = prisons => map(getMaxPrisoners, prisons);

export const directoryToOptions = map(renameKeys({ id: 'value', name: 'label' }));

export const getFirstYearInFeatures = pipe(
  map(pipe(prop('properties'), keys)),
  flatten,
  map(Number),
  ifElse(compose(gt(2), length), compose(or(__, null), head), apply(min))
);

export const getPeriods = camp =>
  camp
    .get('features')
    .toJS()
    .map(feature => Object.keys(feature.properties).map(year => parseInt(year, 10)))
    .filter(years => years.length > 0)
    .map((years, i) => {
      const coma = camp.get('features').size - 1 === i ? '' : ';';
      if (years.length === 1) {
        return `${years[0]}${coma}\n`;
      }
      return `${Math.min(...years)}—${Math.max(...years)}${coma}\n`;
    });

export const filterBySearch = (searchQuery, prisons) => {
  if (searchQuery.length > 0) {
    return prisons.filter((prison) => {
      const searchString = [
        prison.get('id'),
        prison.getIn(['title', 'ru']),
        prison.getIn(['title', 'en']),
        prison.getIn(['subTitles', 'ru']),
        prison.getIn(['subTitles', 'en']),
        prison.get('max_prisoners')
      ]
        .join(' ')
        .toLowerCase();

      return searchString.match(searchQuery.trim().toLowerCase());
    });
  }

  return prisons;
};

export const splitDigits = digit => String(digit).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');
