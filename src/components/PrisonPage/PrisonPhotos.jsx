import React from 'react';
import FieldTitle from '../FieldTitle';
import styled from 'styled-components';

const Photos = styled.div`
  width: 100%;
  margin-bottom: 50px;
  & figure {
    cursor: pointer;
    display: inline-block;
    margin: 0 10px 0 0;
    vertical-align: top;
    & img {
      width: 150px;
      height: 100px;
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
  const {path, id} = props.photo;
  return (
    <figure onClick={ props.onClick.bind(null, path) }>
      <img src={ path } role='presentation'/>
      <figcaption>{ id }</figcaption>
    </figure>
  );
};

class PrisonPhotos extends React.PureComponent {
  uploadPhotos = () => {
    this.props.uploadHandler(this.props.prison.id, this.refs.photos.files);
  };

  render() {
    const { onClick } = this.props;
    const photos = this.props.prison.photos || [];
    return (
      <Photos>
        <FieldTitle>фотографии</FieldTitle>
        {
          photos.map(photo =>
            <PrisonPhoto
              key={ photo.id }
              photo={ photo }
              onClick={ onClick }
            />
          )
        }
        <label>
          <UploadPhoto>Загрузить</UploadPhoto>
          <input
            type='file'
            ref='photos'
            onChange={ this.uploadPhotos }/>
        </label>
      </Photos>
    );
  }
}

export default PrisonPhotos;
