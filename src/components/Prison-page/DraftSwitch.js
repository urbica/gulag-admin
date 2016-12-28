import React from 'react';

const DraftSwitch = (props) => {
  const { defaultChecked } = props;
  return (
    <div className='draft-switch'>
      <span className='draft'>черновик</span>
      <label className='switch'>
        <input type='checkbox' defaultChecked={ defaultChecked }/>
        <div className='slider'/>
      </label>
      <span className='published'>опубликовано</span>
    </div>
  );
}

export default DraftSwitch;
