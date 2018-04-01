import React from 'react';
import PropTypes from 'prop-types';

// styled
import Container from './Container';
import FieldTitle from '../../FieldTitle';
import YearsList from './YearsList';
import YearLabel from './YearLabel';
import YearSpan from './YearSpan';

const years = [];
// eslint-disable-next-line
for (let i = 1918; i <= 1960; i++) {
  years.push(i);
}

const LocationYears = ({ locations, selectedLocationIndex, toggleYear }) => {
  const yearsDisabled = [];
  const yearsChecked = [];

  locations.forEach((location, index) => {
    if (location.get('statistics')) {
      location.get('statistics').forEach((stat) => {
        if (index === selectedLocationIndex) {
          yearsChecked.push(stat.get('year'));
        } else {
          yearsDisabled.push(stat.get('year'));
        }
      });
    }
  });

  return (
    <Container>
      <FieldTitle>Годы существования лагеря</FieldTitle>
      <YearsList>
        {years.map((year) => {
          const checked = yearsChecked.includes(year);
          const disabled = yearsDisabled.includes(year);

          return (
            <YearLabel key={year}>
              <input
                type='checkbox'
                checked={checked}
                disabled={disabled}
                onChange={toggleYear.bind(null, year)}
              />
              <YearSpan>{year}</YearSpan>
            </YearLabel>
          );
        })}
      </YearsList>
    </Container>
  );
};

LocationYears.propTypes = {
  locations: PropTypes.object.isRequired,
  selectedLocationIndex: PropTypes.number.isRequired,
  toggleYear: PropTypes.func.isRequired
};

export default LocationYears;
