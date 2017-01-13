import React from 'react';
import TextInput from '../Inputs/TextInput';

const CoordinatesInput = (props) => {
  const {coordinates, updateCoordinates} = props;
  const value = coordinates[0] + ', ' + coordinates[1];

  const changeHandler = (event) => {
    const {value} = event.target;
    const newCoordinates = value.split(/, /);
    updateCoordinates(newCoordinates);
  };

  return (
    <TextInput
      value={ value }
      onChange={ changeHandler }
    />
  );
};

export default CoordinatesInput;