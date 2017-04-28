import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrap = styled.button`
  width: 102px;
  height: 100px;
  padding: 0;
  border: none;
  margin-top: 140px;
  background-color: ${({ isPlay }) => isPlay ? '#1C2229' : '#27303A'};
  text-align: center;
  pointer-events: auto;
  overflow: hidden;
  outline: none;
  transition: all 0.25s ease;
`;

const Tittle = styled.div`
  width: 72px;
  height: 61px;
  padding: 10px 0;
  border-left: 2px solid #fff;
  border-right: 2px solid #fff;
  margin: auto;
  color: #fff;
  font-family: PT Sans;
  font-size: 16px;
  opacity: 0.5;
`;

const PlayButton = ({ onClick }) => (
  <Wrap onClick={onClick}>
    <Tittle>
      Весь период
    </Tittle>
  </Wrap>
);

PlayButton.propTypes = {
  onClick: PropTypes.func
};

export default PlayButton;
