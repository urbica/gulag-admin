import React from 'react';

const TextInput = (props) => {
  const { onChange, placeholder, defaultValue } = props;
  return (
    <div className='inputWrapper'>
      <input
        className='input'
        type='text'
        onChange={ onChange }
        placeholder={ placeholder }
        defaultValue={ defaultValue }
      />
      <div className='inputLine'/>
    </div>
  );
}

export default TextInput;
