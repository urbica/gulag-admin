import PropTypes from 'prop-types';
import styled from 'styled-components';

const color = {
  orange: '#ff5c00',
  red: '#d0021b'
};

const Button = styled.button`
  border: none;
  outline: none;

  font-size: 16px;
  font-weight: 900;
  color: ${props => color[props.color] || '#000'};
  
  background-color: transparent;

  cursor: pointer;

  transition: .2s;

  &:hover,
  &:focus {
    opacity: 0.6;
    transition: .2s;
  }
  
  &:active {
    opacity: 0.4;
    transition: .2s;
  }
`;

Button.propTypes = {
  color: PropTypes.oneOf(['orange', 'red'])
};

export default Button;
