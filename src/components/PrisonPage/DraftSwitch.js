import React from 'react';
import classnames from 'classnames';
import './DraftSwitch.css';

const DraftSwitch = (props) => {
  const { defaultChecked } = props;

  const className = classnames('draft-switch', {
    'draft-switch_en': props.lang === 'en'
  });

  return (
    <div className={ className }>
      <label>
        <input type='checkbox' defaultChecked={ defaultChecked }/>
        <span className='draft'>черновик</span>
        <div className='slider'/>
        <span className='publish'>опубликованно</span>
      </label>
    </div>
  );
};

export default DraftSwitch;
