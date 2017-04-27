import React from 'react';

const Popup = ({ features, onClick }) => (
  <div>
    {
      features.map(f => (
        <div
          key={f.properties.id}
          onClick={() => onClick(f.properties.id)}
        >
          {f.properties.ruName}
        </div>
      ))
    }
  </div>
);

export default Popup;
