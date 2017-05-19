import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Label = styled.label`
  background-color: #f3f3f3;
  position: relative;
  padding: 5px;
  margin-right: 10px;
  overflow: hidden;
  cursor: pointer;
  & input {
    display: none;
  }
  & span {
    position: relative;
    display: inline-block;
    width: 125px;
    text-align: center;
    line-height: 40px;
    font-family: 'PT Sans';
    font-size: 12px;
    font-weight: bold;
    text-transform: uppercase;
    z-index: 1;
  }
`;

const Switcher = styled.div`
  position: absolute;
  width: calc(50% - 5px);
  left: ${props => !props.checked ? '5px' : '50%'};
  top: 5px;
  bottom: 5px;
  background-color: #fff;
  transition: 0.3s ease-in 0s;
  z-index: 0;
`;

const DraftSwitch = (props) => {
  const { published, onChange } = props;

  return (
    <Label>
      <input
        type='checkbox'
        checked={published}
        onChange={onChange.bind(null, !published)}
      />
      <span>ЧЕРНОВИК</span>
      <span>ОПУБЛИКОВАННО</span>
      <Switcher checked={published} />
    </Label>
  );
};

DraftSwitch.propTypes = {
  published: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
};

export default DraftSwitch;
