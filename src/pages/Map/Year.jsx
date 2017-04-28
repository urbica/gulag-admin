import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const animate = keyframes`
  0% {
    opacity: 0;
  }
  
  50% {
    opacity: 0.2;
  }
  
  100% {
    opacity: 0;
  }
`;

const Wrap = styled.div`
  position: fixed;
  top: 72px;
  font-family: 'PT Sans', sans-serif;
  font-size: 200px;
  color: #fff;
  opacity: 0;
  z-index: 1;
  pointer-events: none;
  animation: ${animate} 1s linear;
`;

const Year = ({ year }) => <Wrap>{year}</Wrap>;

Year.propTypes = {
  year: PropTypes.number
};

export default Year;
