/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// styled
import Container from './Container';
import Top from './Top';
import Bottom from './Bottom';

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
        <Bottom>
          {
            this.props.photos.map((img, i) => (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={i}
                onClick={() => this.setState({ activePhotoId: i })}
              >
                <img
                  src={img}
                  alt=''
                />
              </div>
            ))
          }
        </Bottom>
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
