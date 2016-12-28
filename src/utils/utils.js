import R, { compose, nthArg, pickBy, test, uncurryN } from 'ramda';

export const renameKeys = R.curry((keysMap, obj) =>
  R.reduce((acc, key) => {
    acc[keysMap[key] || key] = obj[key];
    return acc;
  }, {}, R.keys(obj))
);

export const pickByRegExp = uncurryN(2, RegExp =>
  pickBy(compose(test(RegExp), nthArg(1)))
);
