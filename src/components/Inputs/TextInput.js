import React from 'react';
import classnames from 'classnames';

const TextInput = (props) => {
  const {onChange, placeholder, defaultValue} = props;

  const className = classnames('input', {
    'input_en': props.lang === 'en'
  });

  return (
    <div className='inputWrapper'>
      <input
        className={ className }
        type='text'
        onChange={ onChange }
        placeholder={ placeholder }
        defaultValue={ defaultValue }
      />
      <div className='inputLine'/>
    </div>
  );
};

export default TextInput;
