import React from 'react';
import classnames from 'classnames';
import './Button.css';

const Button = (props) => {
  const className = classnames('button', {
    [`button_${props.color}`]: !!props.color
  });

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
