/* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/label-has-for */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

// styled
import Container from './Container';
import FieldTitle from '../../FieldTitle';

const PrisonPhoto = ({ photo, onClick, onDelete }) => {
  const { path, id } = photo;
  return (
    <figure>
      <img
        src={path}
        alt={id}
        onClick={onClick.bind(null, path)}
      />
      <figcaption>{id}</figcaption>
      <button onClick={onDelete}>Удалить</button>
    </figure>
  );
};

PrisonPhoto.propTypes = {
  photo: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

const style = {
  display: 'inline-block',
  width: '150px',
  height: '100px',
  padding: '38px 0 44px',
  border: 'dashed 1px #979797',
  borderRadius: '10px',
  textAlign: 'center',
  cursor: 'pointer'
};

class PrisonPhotos extends PureComponent {
  constructor(props) {
    super(props);
    this.uploadPhotos = this.uploadPhotos.bind(this);
    this.deletePhoto = this.deletePhoto.bind(this);
  }

  uploadPhotos(photo) {
    const { uploadHandler } = this.props;
    uploadHandler(photo);
  }

  deletePhoto(photoId) {
    const { deletePhoto } = this.props;
    // eslint-disable-next-line
    if (confirm('Удалить фото?')) {
      deletePhoto(photoId);
    }
  }

  render() {
    const { onClick } = this.props;
    const photos = this.props.photos || [];

    return (
      <Container>
        <FieldTitle>фотографии</FieldTitle>
        {
          photos.map(photo => (
            <PrisonPhoto
              key={photo.id}
              photo={photo}
              onClick={onClick}
              onDelete={this.deletePhoto.bind(this, photo.id)}
            />
          ))
        }
        <Dropzone
          onDrop={this.uploadPhotos}
          style={style}
        >
          Загрузить
        </Dropzone>
      </Container>
    );
  }
}

PrisonPhotos.propTypes = {
  uploadHandler: PropTypes.func.isRequired,
  deletePhoto: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  photos: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired
};

export default PrisonPhotos;
