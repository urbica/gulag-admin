import React from 'react';
import PropTypes from 'prop-types';

import { ChartButton } from './StyledButtons';
import play from './icons/btn-play.svg';
import pause from './icons/btn-pause.svg';

const PlayButton = ({ onClick, isDemoPlayed: isPlay }) => (
  <ChartButton onClick={onClick}>
    <img src={!isPlay ? play : pause} alt='play-icon' />
  </ChartButton>
);

PlayButton.propTypes = {
  onClick: PropTypes.func,
  isDemoPlayed: PropTypes.bool
};

export default PlayButton;
