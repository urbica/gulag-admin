import React from 'react';

const TextInput = (props) => {
  const {onChange, placeholder, defaultValue} = props;
  const className = props.lang !== 'en' ? 'input' : 'input input_en';
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
