/* eslint-disable react/no-danger, react/no-array-index-key */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Parser, HtmlRenderer } from 'commonmark';
import './inputs.css';

// utils
import parseMd from '../../../../utils/parseMD';

// components
import Gallery from './Gallery/Gallery';

// styled
import Container from './Container';
import DescriptionTitle from './DescriptionTitle';
import PreviewButton from './PreviewButton';
import TextArea from './TextArea';

const reader = new Parser();
const writer = new HtmlRenderer();
const imgURLRegEx = /(?:!\[.*?]\()+(.+?)(?:\))+/g;

class MarkdownEditor extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      preview: false
    };

    this.togglePreview = this.togglePreview.bind(this);
  }

  togglePreview() {
    this.setState(({ preview }) => ({ preview: !preview }));
  }

  render() {
    const { source, onChange } = this.props;

    return (
      <Container>
        {
          this.state.preview &&
          <div className='inputWrapper'>
            <DescriptionTitle>
              Описание лагеря
              <PreviewButton onClick={this.togglePreview}>
                Редактировать
              </PreviewButton>
            </DescriptionTitle>
            {
              parseMd(source)
                .map((elem, i) => {
                  switch (elem.type) {
                    case 'description': {
                      const parsed = reader.parse(elem.payload);
                      const result = writer.render(parsed);
                      return (
                        <div
                          key={i}
                          dangerouslySetInnerHTML={{ __html: result }}
                        />
                      );
                    }
                    case 'incut': {
                      const parsed = reader.parse(elem.payload);
                      const result = writer.render(parsed);
                      return (
                        <div
                          key={i}
                          className='incut'
                        >
                          <div dangerouslySetInnerHTML={{ __html: result }} />
                        </div>
                      );
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
                })
            }
          </div>
        }
        {
          !this.state.preview &&
          <div className='inputWrapper'>
            <DescriptionTitle>
              Описание лагеря
              <PreviewButton onClick={this.togglePreview}>
                Просмотр
              </PreviewButton>
            </DescriptionTitle>
            <TextArea
              value={source}
              onChange={({ target }) => onChange(target.value)}
              className='input'
            />
            <div className='inputLine' />
          </div>
        }
      </Container>
    );
  }
}

MarkdownEditor.propTypes = {
  source: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default MarkdownEditor;
