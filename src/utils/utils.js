export const getPeriods = locations => {
  const loc = locations || [];
  return loc.reduce((acc, location) => {
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
};

export const splitDigits = digit =>
  String(digit).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');
