/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import MaskedInput from 'react-text-mask';

// styled
import Container from './Container';
import Title from './Title';
import Label from './Label';
import Year from './Year';

const PrisonStatistics = (props) => {
  const { feature, onChange } = props;
  return (
    <Container>
      <Title>Количество заключенных по годам</Title>
      {Object.keys(feature.properties)
        .map(year => (
          <Label key={year}>
            <Year>{year}:</Year>
            <MaskedInput
              className='input input_inside'
              type='text'
              value={feature.properties[year].peoples || ''}
              mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
              guide={false}
              onChange={onChange.bind(null, year)}
            />
            <div className='inputLine' />
          </Label>
        ))}
    </Container>
  );
};

export default PrisonStatistics;
