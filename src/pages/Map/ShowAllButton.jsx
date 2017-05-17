import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ChartButton } from './StyledButtons';

const Button = styled(ChartButton)`
  font-size: 12px;
  background-color: ${({ showAll }) => showAll ? '#000' : 'rgba(0,0,0,.5)'} 
  color: ${({ showAll }) => showAll ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,.6)'};
`;

const Text = styled.div`
  margin-top: -2px;
`;
const PlayButton = ({ onClick, showAll }) => (
  <Button
    onClick={onClick}
    showAll={showAll}
  >
    <Text>Весь период</Text>
  </Button>
);

PlayButton.propTypes = {
  onClick: PropTypes.func,
  showAll: PropTypes.bool
};

export default PlayButton;
