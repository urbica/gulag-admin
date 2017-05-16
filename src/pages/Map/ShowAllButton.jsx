import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ButtonTemplate from './StyledButton';
import allPeriod from './icons/btn-period.svg';

const Button = styled(ButtonTemplate)`
  pointer-events: auto;
  background-color: #28292E;
  transform: translateY(100%);
  margin-top: 45px;
`;

const PlayButton = ({ onClick, showAll }) => (
  <Button
    onClick={onClick}
    showAll={showAll}
  >
    <img src={allPeriod} alt='all-period' />
  </Button>
);

PlayButton.propTypes = {
  onClick: PropTypes.func,
  showAll: PropTypes.bool
};

export default PlayButton;
