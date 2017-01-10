import React from 'react';
import classnames from 'classnames';

const TextInput = (props) => {
  const { className, value, onChange, placeholder } = props;
  const classNames = classnames('input', className);

  return (
    <div className='inputWrapper'>
      <input
        type='text'
        value={ value }
        onChange={ onChange }
        className={ classNames }
        placeholder={ placeholder }
      />
      <div className='inputLine'/>
    </div>
  );
};

export default TextInput;
