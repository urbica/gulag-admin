import React from 'react';
import styled from 'styled-components';

const Photos = styled.div`
  width: 100%;
  margin-bottom: 50px;
  & figure {
    display: inline-block;
    margin: 0 10px 0 0;
    & img {
      width: 150px;
      height: 100px;
    }
  }
`;

const PrisonPhoto = (props) => {
  const {path, id} = props;
  return (
    <figure>
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
    const photos = this.props.prison.photos || [];
    return (
      <Photos>
        <div className='field-title'>фотографии</div>
        {
          photos.map(photo =>
            <PrisonPhoto key={ photo.id } { ...photo } />
          )
        }
        <input
          type='file'
          ref='photos'
          onChange={ this.uploadPhotos }/>
      </Photos>
    );
  }
}

export default PrisonPhotos;