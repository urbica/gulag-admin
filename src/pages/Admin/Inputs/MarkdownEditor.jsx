/* eslint-disable react/prop-types, react/no-danger */
import React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import { lensProp, not, over } from 'ramda';

import parseMd from '../../../utils/parseMD';

import FieldTitle from '../FieldTitle';
import Button from '../Button';

const DescriptionTitle = styled(FieldTitle)`
  position: relative;
`;

const PreviewButton = styled(Button)`
  position: absolute;
  right: 0;
  bottom: -1px;
`;

const MarkdownWrap = styled.div`
  & img {
    max-width: 100%;
  }
`;

const TextArea = styled.textarea`
  min-width: 100%;
  max-width: 100%;
  min-height: 400px;
  padding: 12px;
  border: none;
  background-color: '#f3f3f3';
  outline: none;
`;

class MarkdownEditor extends React.PureComponent {
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
    this.setState(over(lensProp('preview'), not));
  }

  render() {
    const { inputClassName, onChange, onFocus, source, title, color } = this.props;
    const inputClassNames = classnames('input', inputClassName);

    return (
      <MarkdownWrap>
        {
          this.state.preview &&
          <div className='inputWrapper'>
            <DescriptionTitle color={color}>
              {title}
              <PreviewButton onClick={this.togglePreview}>
                Редактировать
              </PreviewButton>
            </DescriptionTitle>
            <div dangerouslySetInnerHTML={{ __html: parseMd(source) }} />
          </div>
        }
        {
          !this.state.preview &&
          <div className='inputWrapper'>
            <DescriptionTitle color={color}>
              {title}
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
              onFocus={onFocus}
              color={color}
              onChange={onChange}
              className={inputClassNames}
            />
            <div className='inputLine' />
          </div>
        }
      </MarkdownWrap>
    );
  }
}

export default MarkdownEditor;
