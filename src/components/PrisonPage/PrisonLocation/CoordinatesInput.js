import React from 'react';
import styled from 'styled-components';

const InputWrap = styled.label`
  position: relative;
  padding-left: 120px;
  padding: 8px 8px 5px;
  margin-left: auto;
  background-color: #f3f3f3;
  &:hover {
    background-color: #f9f9f9;
  }
`;

const InputDesc = styled.span`
  opacity: .5;
`;

const Input = styled.input`
  width: auto !important;
  border: none;
  border-radius: 0;
  font-family: 'PT Sans', sans-serif;
  background-color: #f3f3f3;
  outline: none;
  font-size: 12px;
  font-weight: bold;
  text-align: right;
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
      <InputDesc>долгота, широта</InputDesc>
      <Input
        className='input'
        type='text'
        value={ value }
        onChange={ changeHandler }
      />
      <div className='inputLine'/>
    </InputWrap>

  );
};

export default CoordinatesInput;