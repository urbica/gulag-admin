import React from 'react';
import styled from 'styled-components';

const InputWrap = styled.label`
  position: relative;
  display: flex;
  align-items: baseline;
  padding: 13px 12px;
  background-color: #f3f3f3;
`;

const InputDesc = styled.span`
  opacity: .5;
`;

const Input = styled.input`
  flex-grow: 100;
  padding: 0;
  border: none;
  border-radius: 0;
  font-family: 'PT Sans', sans-serif;
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
    <InputWrap>
      <InputDesc>{ desc }</InputDesc>
      <Input
        type='text'
        placeholder={ placeholder }
        value={ value }
        onChange={ onChange }
      />
      <InputLine/>
    </InputWrap>
  );
};

TextInput.propTypes = {
  desc: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  value: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),
  onChange: React.PropTypes.func.isRequired
};

export default TextInput;