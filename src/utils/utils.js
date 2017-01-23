import R, { compose, groupBy, head, map, nthArg, pickBy, prop, test, uncurryN,
  reduce, values, assoc, evolve, concat, curryN, toPairs } from 'ramda';

export const renameKeys = R.curry((keysMap, obj) =>
  R.reduce((acc, key) => {
    acc[keysMap[key] || key] = obj[key];
    return acc;
  }, {}, R.keys(obj))
);

export const pickByRegExp = uncurryN(2, RegExp =>
  pickBy(compose(test(RegExp), nthArg(1)))
);

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

export const concatUrl = (url, property) =>
  evolve({ [`${property}`]: concat(`${url}/`) });

export const fillPhotos = curryN(2, (photosById, prisons) => {
  return reduce((acc, [prisonId, photos]) => {
    acc[prisonId].photos = map(concatUrl(window.location.origin, 'path'), photos);
    return acc;
  }, prisons, toPairs(photosById));
});

export const directoryToOptions = map(renameKeys({ id: 'value', name: 'label' }));

export const fetchData = ({ token }) =>
  new Promise((resolve, reject) => {
    const groupById = compose(map(head), groupBy(prop('id')));
    const options = { headers: { Authorization: `Bearer ${token}` } };

    Promise.all([
      fetch('/api/public/camps.json', options).then(r => r.json()),
      fetch('/api/public/uploads.json', options).then(r => r.json()),
      fetch('/api/public/activities.json', options).then(r => r.json()),
      fetch('/api/public/places.json', options).then(r => r.json()),
      fetch('/api/public/types.json', options).then(r => r.json())
    ]).then(([prisons, photos, activities, places, types]) => {
      const photosById = groupBy(prop('camp_id'), photos);
      const preprocess = compose(
        fillPhotos(photosById),
        fillMaxPrisoners,
        groupById
      );

      resolve({
        activities: activities,
        places: places,
        types: types,
        prisons: preprocess(prisons)
      });
    })
    .catch(error => reject(error));
  });

export const getPeriods = (prison) =>
  (prison.features || [])
    .map(feature => Object.keys(feature.properties).map(year => parseInt(year, 10)))
    .filter(years => years.length > 0)
    .map(years => `${Math.min.apply(Math, years)} — ${Math.max.apply(Math, years)}`)
    .join('; ');
