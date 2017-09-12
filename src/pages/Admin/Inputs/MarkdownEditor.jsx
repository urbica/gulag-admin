/* eslint-disable react/no-danger */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// utils
import parseMd from '../../../utils/parseMD';

// components
import Gallery from '../../Map/Gallery/Gallery';

// styled
import Container from './Container';
import DescriptionTitle from './DescriptionTitle';
import PreviewButton from './PreviewButton';
import TextArea from './TextArea';

class MarkdownEditor extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      preview: false
    };

    this.onBlur = this.onBlur.bind(this);
    this.togglePreview = this.togglePreview.bind(this);
  }

  onBlur() {
    const el = this.textarea;
    this.props.onBlur({
      selectionStart: el.selectionStart,
      selectionEnd: el.selectionEnd
    });
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
            <div dangerouslySetInnerHTML={{ __html: parseMd(source).description }} />
            {
              parseMd(source).galleries.map((gallery, i) => (
                <Gallery
                  // eslint-disable-next-line react/no-array-index-key
                  key={i}
                  photos={gallery}
                />
              ))
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
              innerRef={(ref) => {
                this.textarea = ref;
              }}
              value={source}
              onBlur={this.onBlur}
              onChange={onChange}
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
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired
};

export default MarkdownEditor;
