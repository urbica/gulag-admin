/* eslint-disable react/prop-types */

import React from 'react';
import styled from 'styled-components';

import FieldTitle from '../FieldTitle';

const Photos = styled.div`
  & figure {
    position: relative;
    display: inline-block;
    margin: 0 10px 0 0;
    vertical-align: top;
    cursor: pointer;
    & img {
      width: 150px;
      height: 100px;
    }
    & button {
      position: absolute;
      top: 0;
      right: 0;
      display: none;
      padding: 3px 10px;
      border: none;
      background-color: #000;
      color: #fff;
      font-family: 'PT Sans';
      font-size: 14px;
      opacity: .7;
      cursor: pointer;
    }
    &:hover button {
      display: block;
    }
  }
`;

const UploadPhoto = styled.div`
  display: inline-block;
  width: 150px;
  height: 100px;
  padding: 38px 0 44px;
  border: dashed 1px #979797;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  & + input {
    display: none;
  }
`;

const PrisonPhoto = (props) => {
  const { path, id } = props.photo;
  return (
    <figure>
      <img
        src={path}
        alt={id}
        onClick={props.onClick.bind(null, path)}
      />
      <figcaption>{ id }</figcaption>
      <button onClick={props.onDelete}>Удалить</button>
    </figure>
  );
};

class PrisonPhotos extends React.PureComponent {
  constructor(props) {
    super(props);
    this.uploadPhotos = this.uploadPhotos.bind(this);
    this.deletePhoto = this.deletePhoto.bind(this);
  }

  uploadPhotos() {
    const { uploadHandler } = this.props;
    uploadHandler(this.photos.files);
  }

  deletePhoto(photoId) {
    const { deletePhoto } = this.props;
    if (confirm('Удалить фото?')) {
      deletePhoto(photoId);
    }
  }

  render() {
    const { onClick } = this.props;
    const photos = this.props.photos || [];

    return (
      <Photos>
        <FieldTitle>фотографии</FieldTitle>
        {
          photos.map(photo =>
            <PrisonPhoto
              key={photo.id}
              photo={photo}
              onClick={onClick}
              onDelete={this.deletePhoto.bind(this, photo.id)}
            />
          )
        }
        <label>
          <UploadPhoto>Загрузить</UploadPhoto>
          <input
            type='file'
            ref={(ref) => { this.photos = ref; }}
            onChange={this.uploadPhotos}
          />
        </label>
      </Photos>
    );
  }
}

export default PrisonPhotos;
