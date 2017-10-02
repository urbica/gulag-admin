/* eslint-disable
react/no-danger, react/no-array-index-key, jsx-a11y/no-static-element-interactions */
import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';
import { Parser, HtmlRenderer } from 'commonmark';
import styled from 'styled-components';

import Gallery from '../Gallery/Gallery';

import parseMd from '../../../utils/parseMD';

const reader = new Parser();
const writer = new HtmlRenderer();

const imgURLRegEx = /(?:!\[.*?]\()+(.+?)(?:\))+/g;

const FullScreenContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5%;

  background-color: rgba(0, 0, 0, 0.8);

  z-index: 3;

  img {
    max-width: 100%;
    max-height: calc(100vh - 10%);
  }
`;

class Description extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      imgUrl: null
    };
    this.onClick = this.onClick.bind(this);
    this.fullScreenOnClick = this.fullScreenOnClick.bind(this);
  }

  onClick(e) {
    const element = e.target;

    if (element.tagName === 'IMG') {
      this.setState({ imgUrl: element.src });
      document.body.style.overflow = 'hidden';
    }
  }

  fullScreenOnClick() {
    this.setState({ imgUrl: null });
    document.body.style.overflow = 'initial';
  }

  render() {
    const parsed = reader.parse(this.props.md);
    const result = writer.render(parsed);
    const className = this.props.isIncut ? 'incut' : '';

    return (
      <div>
        <div
          className={className}
          onClick={this.onClick}
          dangerouslySetInnerHTML={{ __html: result }}
        />
        {
          this.state.imgUrl &&
          <FullScreenContainer onClick={this.fullScreenOnClick}>
            <img src={this.state.imgUrl} alt='' />
          </FullScreenContainer>
        }
      </div>
    );
  }
}

Description.propTypes = {
  md: Proptypes.string.isRequired,
  isIncut: Proptypes.bool.isRequired
};

const PrisonDescription = ({ md }) => parseMd(md).map((elem, i) => {
  switch (elem.type) {
    case 'description': {
      return <Description key={i} md={elem.payload} isIncut={false} />;
    }
    case 'incut': {
      return <Description key={i} md={elem.payload} isIncut />;
    }
    case 'gallery': {
      const photos = [];
      let arr;

      // eslint-disable-next-line no-cond-assign
      while ((arr = imgURLRegEx.exec(elem.payload)) !== null) {
        // adding current match to last arr in acc
        photos.push(arr[1]);
      }
      return (
        <Gallery
          key={i}
          photos={photos}
        />
      );
    }
    default:
      return null;
  }
});

export default PrisonDescription;
