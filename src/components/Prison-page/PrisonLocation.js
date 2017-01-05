import React from 'react';
import TextInput from './TextInput';
import Map from '../Map/Map';

const PrisonLocation = (props) => {
  const {prison} = props;
  const features = prison.features || [];
  return (
    <div className="prison__location">
      <div className="field-title">
        {
          features.map((location, key) => {
            let className = features[0] === location ?
              'field-title__location field-title__location_active' : 'field-title__location';

            return (
              <div className={ className }
                   key={ key }
              >
                Локация { key + 1 }
              </div>
            )
          })
        }
        <button className="field-title__plus">+</button>
      </div>
      <TextInput defaultValue={ prison.features[0].properties.location }/>
      <TextInput />
      <Map features={ prison.features }/>
    </div>
  );
};

export default PrisonLocation;
