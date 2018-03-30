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

const LocationYears = ({ features, selectedFeatureIndex, toggleYear }) => {
  let yearsDisabled = [];

  features.forEach((feature, index) => {
    if (index !== selectedFeatureIndex) {
      if (feature.getIn(['properties', 'statistics'])) {
        // eslint-disable-next-line
        const years = feature.getIn(['properties', 'statistics']).keySeq();
        yearsDisabled = yearsDisabled.concat(years.toJS());
      }
    }
  });

  return (
    <Container>
      <FieldTitle>Годы существования лагеря</FieldTitle>
      <YearsList>
        {years.map((year) => {
          const checked =
            features.getIn([selectedFeatureIndex, 'properties', 'statistics', year]) !== undefined;
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
  features: PropTypes.object.isRequired,
  selectedFeatureIndex: PropTypes.number.isRequired,
  toggleYear: PropTypes.func.isRequired
};

export default LocationYears;
