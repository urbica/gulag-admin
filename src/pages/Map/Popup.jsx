import React from 'react';

const Popup = ({ features }) => (
  <div>
    {
      features.map(f => (
        <div key={f.properties.id}>
          <a href={`/prison${f.properties.id}`}>
            {f.properties.ruName}
          </a>
        </div>
      ))
    }
  </div>
);

export default Popup;
