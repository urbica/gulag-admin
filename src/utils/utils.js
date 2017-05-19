import {
  __, apply, compose, curry, flatten, groupBy, gt, head, ifElse, keys, length, map,
  min, nthArg, pickBy, pipe, prop, test, uncurryN, or, reduce, values, assoc, evolve,
  concat, curryN, toPairs
} from 'ramda';

export const renameKeys = curry((keysMap, obj) =>
  reduce((acc, key) => {
    acc[keysMap[key] || key] = obj[key];
    return acc;
  }, {}, keys(obj))
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

  const maxPrisoners = reduce((acc, feature) => (
    Math.max(acc, getMaxPrisoners(feature))
  ), 0, features);

  return assoc('max_prisoners', maxPrisoners, prison);
};

export const fillMaxPrisoners = prisons => (
  map(getMaxPrisoners, prisons)
);

export const concatUrl = (url, property) =>
  evolve({ [`${property}`]: concat(`${url}/`) });

export const fillPhotos = curryN(2, (photosById, prisons) => (
  reduce((acc, [prisonId, photos]) => {
    acc[prisonId].photos = map(concatUrl(window.location.origin, 'path'), photos);
    return acc;
  }, prisons, toPairs(photosById))
));

export const directoryToOptions = map(renameKeys({ id: 'value', name: 'label' }));

export const fetchData = ({ token }) =>
  new Promise((resolve, reject) => {
    const groupById = compose(map(head), groupBy(prop('id')));
    const options = { headers: { Authorization: `Bearer ${token}` } };

    const preprocessPhotos = compose(
      groupBy(prop('camp_id')),
      map(concatUrl(window.location.origin, 'path'))
    );

    const preprocessPrisons = compose(
      fillMaxPrisoners,
      groupById
    );

    const preprocessPeriods = compose(
      groupById
    );

    const handle401 = r => r.status === 401 ? reject(401) : r;

    Promise.all([
      fetch('/api/public/camps.json', options).then(handle401).then(r => r.json()),
      fetch('/api/public/uploads.json', options).then(handle401).then(r => r.json()),
      fetch('/api/public/activities.json', options).then(handle401).then(r => r.json()),
      fetch('/api/public/places.json', options).then(handle401).then(r => r.json()),
      fetch('/api/public/types.json', options).then(handle401).then(r => r.json()),
      fetch('/api/public/periods.json', options).then(handle401).then(r => r.json())
    ]).then(([prisons, photos, activities, places, types, periods]) => {
      resolve({
        activities,
        places,
        types,
        periods: preprocessPeriods(periods),
        photos: preprocessPhotos(photos),
        prisons: preprocessPrisons(prisons)
      });
    }).catch(error => reject(error));
  });

export const getFirstYearInFeatures = pipe(
  map(pipe(prop('properties'), keys)),
  flatten,
  map(Number),
  ifElse(
    compose(gt(2), length),
    compose(or(__, null), head),
    apply(min)
  )
);

export const getPeriods = prison =>
  (prison.features || [])
    .map(feature => Object.keys(feature.properties).map(year => parseInt(year, 10)))
    .filter(years => years.length > 0)
    .map((years) => {
      if (years.length === 1) {
        return `${years[0]}\n`;
      }
      return `${Math.min(...years)} — ${Math.max(...years)}\n`;
    });

export const filterBySearch = (searchQuery, prisons) => {
  if (searchQuery.length > 0) {
    return prisons.filter((prison) => {
      const searchString = [
        prison.name.ru,
        prison.name.en,
        prison.additional_names.ru,
        prison.additional_names.en,
        prison.max_prisoners
      ].join(' ').toLowerCase();

      return searchString.match(searchQuery.trim().toLowerCase());
    });
  }

  return prisons;
};

export const prisonsToFeatures = (prisons, currentYear) => {
  const features = prisons.reduce((acc, prison) => {
    const newFeatures = prison.features.reduce((acc, feature) => {
      if (feature.properties[currentYear]) {
        const newProperties = {
          id: prison.id,
          ruName: prison.name.ru,
          enName: prison.name.en,
          deName: prison.name.de,
          peoples: feature.properties[currentYear].peoples
        };

        return acc.concat([{ ...feature, properties: newProperties }]);
      }
      return acc;
    }, []);
    return acc.concat(newFeatures);
  }, []);

  return features;
};

export const getRightLang = (obj, lang) => {
  if (obj[lang]) {
    return obj[lang];
  } else if (obj.en) {
    return obj.en;
  }
  return obj.ru;
};

export const splitDigits = digit => String(digit).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');
