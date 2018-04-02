/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TextInput from '../TextInput/TextInput';

const InputWrap = styled.div`
  margin-left: auto;
  & label {
    padding: 8px 8px 5px;
    & input {
      font-size: 12px;
      font-weight: bold;
      text-align: right;
    }
  }
`;

const CoordinatesInput = props => {
  const { coordinates, updateCoordinates } = props;
  const value = `${coordinates[1]}, ${coordinates[0]}`;

  const changeHandler = newValue => {
    const regexp = /^(\d{1,3}(\.\d+)?),\s*(\d{1,3}(\.\d+)?)$/;
    const match = regexp.exec(newValue);
    const newCoordinates = match ? [match[3], match[1]] : [0, 0];
    updateCoordinates(newCoordinates);
  };

  return (
    <InputWrap>
      <TextInput
        desc='широта, долгота'
        value={value}
        onChange={changeHandler}
      />
    </InputWrap>
  );
};

CoordinatesInput.propTypes = {
  coordinates: PropTypes.arrayOf(PropTypes.number),
  updateCoordinates: PropTypes.func
};

export default CoordinatesInput;
