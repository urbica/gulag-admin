import React from 'react';

const PrisonPhotos = () => {
  return (
    <div className="prison__photo">
      <div className="field-title">фотографии</div>
      <figure>
        <img src="http://lorempixel.com/150/100" role="presentation"/>
        <figcaption>image1.png</figcaption>
      </figure>
      <figure>
        <img src="http://lorempixel.com/150/100" role="presentation"/>
        <figcaption>image1.png</figcaption>
      </figure>
      <figure>
        <img src="http://lorempixel.com/150/100" role="presentation"/>
        <figcaption>image1.png</figcaption>
      </figure>
    </div>
  );
};

export default PrisonPhotos;
