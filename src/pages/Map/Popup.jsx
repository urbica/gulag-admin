import React from 'react';
import PropTypes from 'prop-types';
import styled, { injectGlobal } from 'styled-components';

// eslint-disable-next-line
injectGlobal`
  .mapboxgl-popup-tip {
    display: none;
  }
  
  .mapboxgl-popup-content {
    padding: 0;
    border: none;
    background: inherit;
    box-shadow: none
  }
`;

const Wrap = styled.div`
  width: 300px;
  max-height: 400px;
  overflow: scroll;
`;

const Button = styled.button`
  display: inline-block;
  width: 100%;
  padding: 25px;
  border: none;
  text-align: left;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
  margin-bottom: 1px;
  outline: none;
  &:hover {
    background-color: #000;
  }
`;

const Popup = ({ features, onClick }) => (
  <Wrap>
    {
      features.map(f => (
        <Button
          key={f.properties.id}
          onClick={() => onClick(f.properties.id)}
        >
          {f.properties.ruName}
        </Button>
      ))
    }
  </Wrap>
);

Popup.propTypes = {
  features: PropTypes.arrayOf(
    PropTypes.object
  ),
  onClick: PropTypes.func
};

export default Popup;
