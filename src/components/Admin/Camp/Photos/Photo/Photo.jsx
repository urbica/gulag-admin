import React from 'react';
import PropTypes from 'prop-types';

// styled
import Container from './Container';

const Photo = ({ photo, onDelete, activeLang, updatePhoto }) => (
  <Container>
    <figure>
      <img src={`/${photo.get('path')}`} alt={photo.get('id')} />
      <button onClick={onDelete}>Удалить</button>
    </figure>
    <input
      value={photo.getIn(['description', activeLang])}
      onChange={({ target }) =>
        updatePhoto(photo.get('id'), 'description', target.value)
      }
    />
  </Container>
);

Photo.propTypes = {
  photo: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  activeLang: PropTypes.string.isRequired,
  updatePhoto: PropTypes.func.isRequired
};

export default Photo;
