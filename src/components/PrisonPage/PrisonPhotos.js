import React from 'react';

const PrisonPhoto = (props) => {
  const { path, id } = props;
  return (
    <figure>
      <img src={ path } role='presentation'/>
      <figcaption>{ id }</figcaption>
    </figure>
  );
}

class PrisonPhotos extends React.PureComponent {
  uploadPhotos = (e) => {
    this.props.uploadHandler(this.props.prison.id, this.refs.photos.files);
  }

  render() {
    const photos = this.props.prison.photos || [];
    return (
      <div className='prison__photo'>
        <div className='field-title'>фотографии</div>
        {
          photos.map(photo =>
            <PrisonPhoto key={ photo.id } { ...photo } />
          )
        }
        <br/>
        <input type='file' ref='photos' onChange={ this.uploadPhotos } />
      </div>
    );
  }
};

export default PrisonPhotos;
