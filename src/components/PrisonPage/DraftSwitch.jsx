import React from 'react';
import styled from 'styled-components';

const Label = styled.label`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  & input {
    display: none;
  }
`;

const Switcher = styled.div`
  width: 200%;
  margin-left: 0;
  transition: margin 0.3s ease-in 0s;
  &:before,
  &:after {
    display: block;
    float: left;
    width: 50%;
    padding: 0;
    line-height: 44px;
    font-size: 12px;
    font-family: 'PT Sans';
    font-weight: bold;
    text-transform: uppercase;
    box-sizing: border-box;
  }
  &:before {
    content: "черновик";
    padding-left: 10px;
    background-color: #f3f3f3;
    color: rgba(0, 0, 0, .3);
  }
  &:after {
    content: "опубликован";
    padding-right: 10px;
    background-color: #000;
    color: #fff;
    text-align: right;
  }
  input:checked ~ & {
    margin-left: -100%;
  }
`;

const Circle = styled.div`
  width: 32px;
  margin: 6px;
  background: #000;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  border: 2px solid #999999;
  border-radius: 20px;
  transition: all 0.3s ease-in 0s;
  input:checked ~ & {
    right: 115px;
    background: #fff;
  }
`;

const DraftSwitch = (props) => {
  const { published, onChange } = props;

  return (
    <Label>
      <input
        type="checkbox"
        checked={ published }
        onChange={ onChange.bind(null, !published) }
      />
      <Switcher/>
      <Circle/>
    </Label>
  );
};

DraftSwitch.propTypes = {
  published: React.PropTypes.bool.isRequired,
  onChange: React.PropTypes.func.isRequired
};

export default DraftSwitch;