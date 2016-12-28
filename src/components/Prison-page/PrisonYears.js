import React from 'react';

const years = [];
for (let i = 1918; i <= 1960; i++) {
  years.push(i);
}

const PrisonYears = (props) => {
  const { onClick, prison } = props;
  return (
    <div className='prison__years'>
      <div className='field-title'>Годы существования лагеря</div>
      <div className='years__list'>
        {
          years.map((year, key) => {
            const defaultChecked = prison.features[0] ?
              prison.features[0].properties[year] : false;

            return <label key={ key } className='year'>
              <input
                type='checkbox'
                onClick={ onClick.bind(null, year) }
                defaultChecked={ defaultChecked }
              />
              <span>{ year }</span>
            </label>
          })
        }
      </div>
    </div>
  );
}

export default PrisonYears;
