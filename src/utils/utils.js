export const getPeriods = locations =>
  locations.reduce((acc, location) => {
    if (location.get('statistics')) {
      if (location.get('statistics').size === 1) {
        return [...acc, `${location.getIn(['statistics', 0, 'year'])}; `];
      }
      if (location.get('statistics').size > 1) {
        const firstYear = location
          .get('statistics')
          .first()
          .get('year');
        const lastYear = location
          .get('statistics')
          .last()
          .get('year');

        return [...acc, `${firstYear}—${lastYear}; `];
      }
      return acc;
    }
    return acc;
  }, []);

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
