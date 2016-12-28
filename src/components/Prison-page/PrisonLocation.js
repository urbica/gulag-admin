import React from 'react';
import Map from '../Map/Map';
import TextInput from './TextInput';

const PrisonLocation = (props) => {
  const { prison } = props;
  return (
    <div className="prison__location">
      <div className="field-title">
        {
          prison.features.map((location, key) => {
            let className = prison.features[0] === location ?
              'field-title__location field-title__location_active' : 'field-title__location';

            return <div className={ className }
                        key={ key }
            >
              Локация { key + 1 }
            </div>
          })
        }
        <button className="field-title__plus">+</button>
      </div>
      <TextInput />
      <TextInput />
      <Map features={ prison.features }/>
    </div>
  );
}

export default PrisonLocation;
