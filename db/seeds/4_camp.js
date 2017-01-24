const R = require('ramda');
const fs = require('fs');
const path = require('path');

const { __, adjust, apply, compose, converge, filter, fromPairs, isEmpty, last,
  map, merge, mergeAll, not, nthArg, objOf, or, pair, pick, pickBy, pipe, prop,
  range, split, test, toLower, toPairs, values, uniq, unnest } = R;

const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json')));

const notEmpty = R.complement(isEmpty);
const pickByRegExp = RegExp => pickBy(compose(test(RegExp), nthArg(1)));

const getStatistics = pipe(
  pickByRegExp(/^people_\d{4}$/),
  filter(converge(compose(not, or), [isNaN, isEmpty])),
  map(parseInt),
  toPairs,
  map(compose(
    apply(objOf),
    adjust(objOf('peoples'), 1),
    adjust(compose(parseInt, last, split('_')), 0)
  )),
  mergeAll
);

const findIdByName = R.uncurryN(2, name =>
  compose(
    R.when(compose(not, R.isNil), R.prop('id')),
    R.find(R.propEq('name', name))
  )
);

const mapIndexed = R.addIndex(map);
const buildDict = R.uncurryN(2, key => pipe(
  map(compose(toLower, prop(key))),
  uniq,
  filter(notEmpty),
  mapIndexed(compose(R.zipObj(['name', 'id']), R.pair))
));

const types = buildDict('type', data);

const getFeatures = (object) => {
  const locationKeys = [
    ['longitude', 'latitude'],
    ['longitude_2', 'latitude_2'],
    ['longitude_3', 'latitude_3'],
    ['longitude_4', 'latitude_4']
  ];

  const features = locationKeys
    .map(compose(values, filter(notEmpty), pick(__, object)))
    .filter(notEmpty)
    .map(coordinates => ({
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates
      }
    }));

  const yearRanges = [
    [object.year_of_creation, object.year_of_closing],
    [object.year_of_resuming, object.year_of_second_closing],
    [object.year_of_repeated_resuming, object.year_of_third_closing]
  ]
  .map(years => years.map(year => parseInt(year, 10)).filter(year => !isNaN(year)))
  .filter(years => years.length === 2)
  .map(years => range(years[0], years[1] + 1));

  const yearRangesToObject = pipe(
    unnest,
    map(pair(__, { peoples: 0 })),
    fromPairs
  )

  const statistics = merge(yearRangesToObject(yearRanges), getStatistics(object));

  if (features.length > 0) {
    features[0].properties = statistics;
  }

  return features;
};

const getNames = object =>
  object.add_names
    .split(',')
    .concat(object.add_name)
    .filter(notEmpty)
    .join(', ');

const renameKeys = R.curry((keysMap, obj) =>
  R.reduce((acc, key) => {
    acc[keysMap[key] || key] = obj[key];
    return acc;
  }, {}, R.keys(obj))
);

const getDescription = pipe(
  pick([
    'general_description',
    'literary_description',
    'description_of_production',
    'key_persons',
    'facts',
    'summary_description',
    'links'
  ]),
  renameKeys({
    general_description: 'Общее описание',
    literary_description: 'Литературное описание',
    description_of_production: 'Описание производственной деятельности лагеря',
    key_persons: 'Ключевые лица',
    facts: 'Факты',
    summary_description: 'Итоговое описание',
    links: 'Интернет-ссылки'
  }),
  toPairs,
  map(([key, value]) => `## ${key}\n${value}\n`),
  R.join('\n')
);

const build = object => ({
  id: object.id,
  name: {
    ru: object.name,
    en: object.engname,
    de: ''
  },
  additional_names: {
    ru: getNames(object),
    en: '',
    de: ''
  },
  activity_id: undefined,
  place_id: undefined,
  type_id: findIdByName(toLower(object.type), types),
  location: {
    ru: object.dislocation,
    en: '',
    de: ''
  },
  description: {
    ru: getDescription(object),
    en: '',
    de: ''
  },
  published: {
    ru: true,
    en: false,
    de: false
  },
  features: JSON.stringify(getFeatures(object))
});

const seed = (knex) => {
  const rows = map(build, data);
  return knex.batchInsert('camps', rows, 50).then(() =>
    knex.raw(`alter sequence camps_id_seq restart with ${rows.length}`)
  );
};

exports.seed = seed;
