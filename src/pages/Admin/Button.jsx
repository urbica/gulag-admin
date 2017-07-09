import PropTypes from 'prop-types';
import styled from 'styled-components';

const border = {
  orange: '#ffceb2',
  red: '#f1bac1'
};
const color = {
  orange: '#ff5c00',
  red: '#d0021b'
};
const hover = {
  bgColor: {
    orange: '#fff5f0',
    red: '#fcf1f3'
  }
};
const active = {
  bdc: {
    orange: '#ff5c00',
    red: '#d0011b'
  }
};

const Button = styled.button`
  width: 120px;
  font-size: 12px;
  padding: 7px 0 5px;
  border: 1px solid ${props => border[props.color] || '#b2b2b2'};
  background-color: transparent;
  color: ${props => color[props.color] || '#000'};
  font-family: 'Formular', sans-serif;
  font-weight: bold;
  text-transform: uppercase;
  outline: none;
  cursor: pointer;
  &:hover,
  &:focus {
    background-color: ${props => hover.bgColor[props.color] || '#f0f0f0'};
  }
  &:active {
    border-color: ${props => active.bdc[props.color] || '#000'};
  }
`;

Button.propTypes = {
  color: PropTypes.oneOf(['orange', 'red'])
};

export default Button;
