/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// styled
import Container from './Container';
import Top from './Top';
import PreviewsContainer from './PreviewsContainer';

class Gallery extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activePhotoId: 0
    };
  }

  render() {
    return (
      <Container>
        <Top>
          <img src={this.props.photos[this.state.activePhotoId]} alt='' />
        </Top>
        {
          this.props.photos.map((img, i) => (
            <PreviewsContainer
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              isActive={this.state.activePhotoId === i}
              onClick={() => this.setState({ activePhotoId: i })}
            >
              <img
                src={img}
                alt=''
              />
            </PreviewsContainer>
          ))
        }
      </Container>
    );
  }
}

Gallery.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.string
  ).isRequired
};

export default Gallery;
