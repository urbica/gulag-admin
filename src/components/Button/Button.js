import React, {Component} from 'react';
import './Button.css';

class Button extends Component {
  render() {
    const className = this.props.color ?  'button button_' + this.props.color : 'button';
    return (
      <button className={className}>
        {this.props.value}
      </button>
    )
  }
}

export default Button;