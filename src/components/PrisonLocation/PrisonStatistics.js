import React from 'react';
import MaskedInput from 'react-text-mask';

const PrisonStatistics = (props) => {
  const {feature} = props;
  return (
    <div className='prison__amount'>
      <div className='field-title'>количество заключенных по годам</div>
      {
        Object.keys(feature.properties).map((year) => {
          return <label className='amount' key={ year }>
            <span className='amount__year'>{ year }:</span>
            <MaskedInput
              className='input input_inside'
              type='text'
              value={ feature.properties[year].peoples }
              mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/,]}
              guide={ false }
            />
            <div className='inputLine'/>
          </label>
        })
      }
    </div>
  );
};

export default PrisonStatistics;
