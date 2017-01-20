import React from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 12px;
  font-family: 'PT Sans', sans-serif;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  & input {
    display: none;
  }
`;

const Draft = styled.span`
  margin-right: 8px;
  color: ${props => props.lang !== 'en' ? 'rgba(0,0,0,1)' : '#3949ab'};
  transition: .4s;
  input:checked + & {
    color: ${props => props.lang !== 'en' ? 'rgba(0,0,0,.3)' : 'rgba(57,73,171,.3)'};
    transition: .4s;
  }
`;

const Slider = styled.div`
  position: relative;
  display: inline-block;
  width: 32px;
  height: 16px;
  border-radius: 25px;
  margin-right: 8px;
  background-color: ${props => props.lang !== 'en' ? '#D1D1D1' : '#ebecf6'};
  vertical-align: text-bottom;
  &::before {
    position: absolute;
    content: '';
    height: 16px;
    width: 16px;
    background-color: ${props => props.lang !== 'en' ? '#000' : '#3949ab'};
    border-radius: 50%;
    transition: .4s;
    input:checked ~ & {
      transform: translateX(16px);
      transition: .4s;
    }
  }
`;

const Publish = styled.span`
  color: ${props => props.lang !== 'en' ? 'rgba(0,0,0,.3)' : 'rgba(57,73,171,.3)'};
  transition: .4s;
  input:checked ~ & {
    color: ${props => props.lang !== 'en' ? 'rgba(0,0,0,1)' : '#3949ab'};
    transition: .4s;
  }
`;

const DraftSwitch = (props) => {
  const {checked, lang, onChange} = props;

  return (
    <Wrap>
      <Label>
        <input
          type='checkbox'
          checked={ checked }
          onChange={ onChange.bind(null, !checked) }
        />
        <Draft lang={ lang }>черновик</Draft>
        <Slider lang={ lang }/>
        <Publish lang={ lang }>опубликованно</Publish>
      </Label>
    </Wrap>
  );
};

export default DraftSwitch;
