import React from 'react';
import PropTypes from 'prop-types';

import { MapButton } from './StyledButtons';
import allPeriod from './icons/btn-period.svg';

const PlayButton = ({ onClick, showAll }) => (
  <MapButton
    onClick={onClick}
    showAll={showAll}
  >
    <img src={allPeriod} alt='all-period' />
  </MapButton>
);

PlayButton.propTypes = {
  onClick: PropTypes.func,
  showAll: PropTypes.bool
};

export default PlayButton;
