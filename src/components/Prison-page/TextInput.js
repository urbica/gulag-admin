import React from 'react';

const TextInput = (props) => {
  const { placeholder, defaultValue } = props;
  return (
    <div className='inputWrapper'>
      <input
        className='input'
        type='text'
        placeholder={ placeholder }
        defaultValue={ defaultValue }
      />
      <div className='inputLine'/>
    </div>
  );
}

export default TextInput;
