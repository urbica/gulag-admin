import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ButtonTemplate from './StyledButton';
import play from './icons/btn-play.svg';
import pause from './icons/btn-pause.svg';

const Button = styled(ButtonTemplate)`
  pointer-events: auto;
  background-color: #28292E;
  transform: translateY(100%);
  margin-top: 45px;
`;

const PlayButton = ({ onClick, isDemoPlayed: isPlay }) => (
  <Button onClick={onClick}>
    <img src={!isPlay ? play : pause} alt='play-icon' />
  </Button>
);

PlayButton.propTypes = {
  onClick: PropTypes.func,
  isDemoPlayed: PropTypes.bool
};

export default PlayButton;
