import React from 'react';
import './Button.css';

const Button = (props) => {
  const className = props.color ? 'button button_' + props.color : 'button';
  return (
    <button className={ className } onClick={ props.onClick }>
      { props.title }
    </button>
  )
}

Button.propTypes = {
  color: React.PropTypes.string,
  title: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func
};

export default Button;
