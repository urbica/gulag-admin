/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// ico
import closeIcon from '../icons/btn-close.svg';

// styled
import Top from './Top';
import FullScreenButton from './FullScreenButton';
import PreviewsContainer from './PreviewsContainer';
import FullScreenContainer from './FullScreenContainer';
import FullScreenTop from './FullScreenTop';
import CloseButton from './CloseButton';

class Gallery extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activePhotoId: 0,
      isFullScreen: false
    };
    this.toggleFullScreen = this.toggleFullScreen.bind(this);
  }

  toggleFullScreen() {
    this.setState(({ isFullScreen }) => ({ isFullScreen: !isFullScreen }));
  }

  render() {
    return (
      <div>
        <Top>
          <div style={{ display: 'inline-block', position: 'relative' }}>
            <img src={this.props.photos[this.state.activePhotoId]} alt='' />
            <FullScreenButton onClick={this.toggleFullScreen} />
          </div>
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
        {
          this.state.isFullScreen &&
          <FullScreenContainer>
            <FullScreenTop>
              <img src={this.props.photos[this.state.activePhotoId]} alt='' />
              <CloseButton onClick={this.toggleFullScreen}>
                <img src={closeIcon} alt='' />
              </CloseButton>
            </FullScreenTop>
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
          </FullScreenContainer>
        }
      </div>
    );
  }
}

Gallery.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.string
  ).isRequired
};

export default Gallery;
