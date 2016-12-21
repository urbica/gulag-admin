import { compose, nthArg, pickBy, test, uncurryN } from 'ramda';

export const pickByRegExp = uncurryN(2, RegExp =>
  pickBy(compose(test(RegExp), nthArg(1)))
);
