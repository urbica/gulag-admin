/* eslint-disable jsx-a11y/no-noninteractive-element-interactions,
jsx-a11y/label-has-for */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import ImageCompressor from 'image-compressor.js';

// components
import Photo from './Photo/Photo';

// styled
import Container from './Container';
import FieldTitle from '../FieldTitle';
import PhotosWrapper from './PhotosWrapper';

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

class CampPhotos extends PureComponent {
  constructor(props) {
    super(props);
    this.uploadPhotos = this.uploadPhotos.bind(this);
    this.deletePhoto = this.deletePhoto.bind(this);
    this.updatePhoto = this.updatePhoto.bind(this);
  }

  uploadPhotos(photo) {
    const { uploadHandler } = this.props;
    const compressorSettings = {
      maxWidth: 1400,
      success(result) {
        const file = new File([result], result.name);
        uploadHandler([file]);
      }
    };

    // eslint-disable-next-line no-new
    new ImageCompressor(photo[0], compressorSettings);
  }

  deletePhoto(photoId) {
    const { deletePhoto } = this.props;
    // eslint-disable-next-line
    if (confirm("Удалить фото?")) {
      deletePhoto(photoId);
    }
  }

  updatePhoto(id, type, value) {
    const { photos, activeLang, updateField } = this.props;
    const updatedPhotos = photos.map(
      photo =>
        photo.get('id') === id ? photo.setIn([type, activeLang], value) : photo
    );

    updateField(['photos'], updatedPhotos);
  }

  render() {
    const { photos, activeLang } = this.props;

    return (
      <Container>
        <FieldTitle>
          фотографии
        </FieldTitle>
        <PhotosWrapper>
          {photos.map(photo => (
            <Photo
              key={photo.get('id')}
              photo={photo}
              onDelete={this.deletePhoto.bind(null, photo.get('id'))}
              activeLang={activeLang}
              updatePhoto={this.updatePhoto}
            />
          ))}
          <Dropzone accept='image/*' onDrop={this.uploadPhotos} style={style}>
            Загрузить
          </Dropzone>
        </PhotosWrapper>
      </Container>
    );
  }
}

CampPhotos.propTypes = {
  uploadHandler: PropTypes.func.isRequired,
  deletePhoto: PropTypes.func.isRequired,
  photos: PropTypes.object.isRequired,
  activeLang: PropTypes.string.isRequired,
  updateField: PropTypes.func.isRequired
};

export default CampPhotos;
