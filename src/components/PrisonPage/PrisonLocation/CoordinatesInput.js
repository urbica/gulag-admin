import React from 'react';
import TextInput from '../../TextInput';
import styled from 'styled-components';

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

const CoordinatesInput = (props) => {
  const { coordinates, updateCoordinates } = props;
  const value = `${coordinates[0]}, ${coordinates[1]}`;

  const changeHandler = (event) => {
    const { value } = event.target;
    const newCoordinates = value.split(/, /);
    updateCoordinates(newCoordinates);
  };

  return (
    <InputWrap>
      <TextInput
        desc='широта, долгота'
        value={ value }
        onChange={ changeHandler }
      />
    </InputWrap>
  );
};

export default CoordinatesInput;