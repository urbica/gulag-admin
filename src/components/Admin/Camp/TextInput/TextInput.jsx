/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// styled
import Container from './Container';

const InputDesc = styled.span`
  opacity: .5;
`;

const Input = styled.input`
  flex-grow: 100;
  padding: 0;
  border: none;
  border-radius: 0;
  font-family: 'Formular', sans-serif;
  font-size: 16px;
  background-color: #f3f3f3;
  outline: none;
`;

const InputLine = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #000;
  z-index: 10;
  transition: width .3s;
  input:focus + & {
    width: 100%;
    transition: width .3s;
  }
`;

const TextInput = (props) => {
  const { placeholder, value, onChange } = props;
  const desc = props.desc || '';

  return (
    <Container>
      <InputDesc>{desc}</InputDesc>
      <Input
        type='text'
        placeholder={placeholder}
        value={value}
        onChange={({ target }) => onChange(target.value)}
      />
      <InputLine />
    </Container>
  );
};

TextInput.propTypes = {
  desc: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  onChange: PropTypes.func.isRequired
};

export default TextInput;
