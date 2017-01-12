import React from 'react';

const years = [];
for (let i = 1918; i <= 1960; i++) {
  years.push(i);
}

const PrisonYears = (props) => {
  const {toggleYear, prison} = props;
  const features = prison.features || [];
  return (
    <div className='prison__years'>
      <div className='field-title'>Годы существования лагеря</div>
      <div className='years__list'>
        {
          years.map((year, key) => {
            const defaultChecked = features[0] ?
              features[0].properties[year] : false;

            return <label key={ key } className='year'>
              <input
                type='checkbox'
                onClick={ toggleYear.bind(null, year) }
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
