/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ChartButton } from './StyledButtons';
import play from './icons/btn-play.svg';
import pause from './icons/btn-pause.svg';

const Button = styled(ChartButton)`
  background-color: ${({ isPlay }) => (isPlay ? '#000' : 'rgba(0,0,0,.5)')};
  & img {
    opacity: 1;
  }
  @media (max-width: 1023px) {
    display: none;
  }
`;

const PlayButton = ({ onClick, isDemoPlayed: isPlay }) => (
  <Button onClick={onClick} isPlay={isPlay}>
    <img src={!isPlay ? play : pause} alt='play-icon' />
  </Button>
);

PlayButton.propTypes = {
  onClick: PropTypes.func,
  isDemoPlayed: PropTypes.bool
};

export default PlayButton;
