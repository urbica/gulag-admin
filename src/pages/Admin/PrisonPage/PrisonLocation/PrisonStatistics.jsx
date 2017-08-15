/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import MaskedInput from 'react-text-mask';
import styled from 'styled-components';

const Wrap = styled.div`
  width: 100%;
`;

const PrisonStatistics = (props) => {
  const { feature, onChange } = props;
  return (
    <Wrap>
      <div className='field-title'>количество заключенных по годам</div>
      {
        Object.keys(feature.properties).map(year => (
          <label className='amount' key={year}>
            <span className='amount__year'>{ year }:</span>
            <MaskedInput
              className='input input_inside'
              type='text'
              value={feature.properties[year].peoples}
              mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
              guide={false}
              onChange={onChange.bind(null, year)}
            />
            <div className='inputLine' />
          </label>
        ))
      }
    </Wrap>
  );
};

export default PrisonStatistics;
