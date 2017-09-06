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
          <img src={this.props.photos[this.state.activePhotoId].path} alt='' />
        </Top>
        <Bottom>
          {
            this.props.photos.map((img, i) => (
              <div onClick={() => this.setState({ activePhotoId: i })}>
                <img
                  key={img.id}
                  src={img.path}
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
    PropTypes.object
  ).isRequired
};

export default Gallery;
