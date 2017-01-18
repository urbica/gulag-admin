import React from 'react';
import styled from 'styled-components';

const FieldTitle = styled.div`
  width: 100%;
  padding: 6px 0;
  border-bottom: 1px solid rgba(0, 0, 0, .3);
  margin-bottom: 10px;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 12px;
  ${props => props.english && 'color: #3949ab'};
`;

FieldTitle.propTypes = {
  english: React.PropTypes.bool
};

export default FieldTitle;