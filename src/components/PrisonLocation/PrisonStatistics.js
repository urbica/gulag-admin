import React from 'react';

const PrisonStatistics = (props) => {
  const { feature } = props;
  return (
    <div className='prison__amount'>
      <div className='field-title'>количество заключенных по годам</div>
      {
        Object.keys(feature.properties).map((year) => {
          return <label className='amount' key={ year }>
            <span className='amount__year'>{ year }:</span>
            <input className='amount__input input'
                   type='text'
                   defaultValue={ feature.properties[year].peoples }/>
            <div className='inputLine'/>
          </label>
        })
      }
    </div>
  );
}

export default PrisonStatistics;
