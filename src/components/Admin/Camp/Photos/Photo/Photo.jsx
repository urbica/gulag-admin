import React from 'react';
import PropTypes from 'prop-types';

const Photo = ({ photo, onDelete }) => (
  <figure>
    <img
      src={photo.get('path')}
      alt={photo.get('id')}
    />
    <figcaption>{photo.get('id')}</figcaption>
    <button onClick={onDelete}>Удалить</button>
  </figure>
);

Photo.propTypes = {
  photo: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default Photo;
