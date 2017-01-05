import React from 'react';
import './DraftSwitch.css';

const DraftSwitch = (props) => {
  const {defaultChecked} = props;
  const className = props.lang !== 'en' ? 'draft-switch' : 'draft-switch draft-switch_en';
  return (
    <div className={ className }>
      <label>
        <input type="checkbox" defaultChecked={ defaultChecked }/>
        <span className="draft">черновик</span>
        <div className="slider"/>
        <span className="publish">опубликованно</span>
      </label>
    </div>
  );
};

export default DraftSwitch;
