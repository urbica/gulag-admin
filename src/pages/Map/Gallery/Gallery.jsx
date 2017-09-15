/* eslint-disable jsx-a11y/no-static-element-interactions,
jsx-a11y/no-noninteractive-element-interactions */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// ico
import closeIcon from '../icons/btn-close.svg';

// styled
import Top from './Top';
import FullScreenButton from './FullScreenButton';
import PreviewsContainer from './PreviewsContainer';
import ImgPreviewContainer from './ImgPreviewContainer';
import FullScreenContainer from './FullScreenContainer';
import FullScreenTop from './FullScreenTop';
import { CloseGalleryButton } from '../StyledButtons';

class Gallery extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activePhotoId: 0,
      isFullScreen: false
    };
    this.toggleFullScreen = this.toggleFullScreen.bind(this);
    this.keydown = this.keydown.bind(this);
    this.changeActivePhoto = this.changeActivePhoto.bind(this);
  }

  toggleFullScreen() {
    this.setState(({ isFullScreen }) => ({ isFullScreen: !isFullScreen }));

    // eslint-disable-next-line no-unused-expressions
    (!this.state.isFullScreen)
      ? document.addEventListener('keydown', this.keydown)
      : document.removeEventListener('keydown', this.keydown);
  }

  keydown(e) {
    if (e.keyCode === 39) {
      this.changeActivePhoto(1);
    }
    if (e.keyCode === 37) {
      this.changeActivePhoto(-1);
    }
    if (e.keyCode === 27) {
      this.setState({ isFullScreen: false });
      document.removeEventListener('keydown', this.keydown);
    }
  }

  changeActivePhoto(val) {
    const length = this.props.photos.length;
    const newActivePhotoId = this.state.activePhotoId + val;

    if (length > newActivePhotoId && newActivePhotoId > -1) {
      this.setState({ activePhotoId: newActivePhotoId });
    } else if (newActivePhotoId > length - 1) {
      this.setState({ activePhotoId: 0 });
    } else {
      this.setState({ activePhotoId: length - 1 });
    }
  }

  render() {
    return (
      <div>
        <Top>
          <div style={{ display: 'inline-block', position: 'relative' }}>
            <img
              src={this.props.photos[this.state.activePhotoId]}
              alt=''
              onClick={this.toggleFullScreen}
            />
            <FullScreenButton onClick={this.toggleFullScreen} />
          </div>
        </Top>
        <PreviewsContainer>
          {
            this.props.photos.map((img, i) => (
              <ImgPreviewContainer
                // eslint-disable-next-line react/no-array-index-key
                key={i}
                isActive={this.state.activePhotoId === i}
                onClick={() => this.setState({ activePhotoId: i })}
              >
                <img
                  src={img}
                  alt=''
                />
              </ImgPreviewContainer>
            ))
          }
        </PreviewsContainer>
        {
          this.state.isFullScreen &&
          <FullScreenContainer>
            <FullScreenTop>
              <img src={this.props.photos[this.state.activePhotoId]} alt='' />
              <CloseGalleryButton onClick={this.toggleFullScreen}>
                <img src={closeIcon} alt='' />
              </CloseGalleryButton>
            </FullScreenTop>
            <PreviewsContainer>
              {
                this.props.photos.map((img, i) => (
                  <ImgPreviewContainer
                    // eslint-disable-next-line react/no-array-index-key
                    key={i}
                    isActive={this.state.activePhotoId === i}
                    onClick={() => this.setState({ activePhotoId: i })}
                  >
                    <img
                      src={img}
                      alt=''
                    />
                  </ImgPreviewContainer>
                ))
              }
            </PreviewsContainer>
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
