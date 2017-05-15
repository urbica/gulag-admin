import { pipe, path, head, keys } from 'ramda';

/**
 * Get prison first existance year
 *
 * @param {Object} prison Prison object
 * @returns {number} first year if present
 */
export const getFirstYear = pipe(
  path(['features', 0, 'properties']),
  keys,
  head,
  year => parseInt(year, 10)
);
