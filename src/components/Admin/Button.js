import PropTypes from 'prop-types';
import styled from 'styled-components';

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

const Button = styled.button`
  width: 120px;
  padding: 7px 0 5px;
  border: none;
  outline: none;

  font-family: 'Formular', sans-serif;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  color: ${props => color[props.color] || '#000'};
  
  background-color: transparent;

  cursor: pointer;

  &:hover,
  &:focus {
    background-color: ${props => hover.bgColor[props.color] || '#f0f0f0'};
  }
`;

Button.propTypes = {
  color: PropTypes.oneOf(['orange', 'red'])
};

export default Button;
