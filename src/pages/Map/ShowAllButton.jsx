import React from 'react';
import PropTypes from 'prop-types';

import { ChartButton } from './StyledButtons';
import allPeriod from './icons/btn-period.svg';

const PlayButton = ({ onClick, showAll }) => (
  <ChartButton
    onClick={onClick}
    showAll={showAll}
  >
    <img src={allPeriod} alt='all-period' />
  </ChartButton>
);

PlayButton.propTypes = {
  onClick: PropTypes.func,
  showAll: PropTypes.bool
};

export default PlayButton;
