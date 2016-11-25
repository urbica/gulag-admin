import React from 'react';
import './Button.css';

class Button extends React.Component {
  render() {
    const className = this.props.color ?  'button button_' + this.props.color : 'button';
    return (
      <button className={className}>
        {this.props.title}
      </button>
    )
  }
}

export default Button;