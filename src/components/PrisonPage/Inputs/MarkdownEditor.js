import React from 'react';
import classnames from 'classnames';
import ReactMarkdown from 'react-markdown';
import {lensProp, not, over} from 'ramda';
import FieldTitle from '../../FieldTitle';
import Button from '../../Button';
import styled from 'styled-components';

const DescriptionTitle = styled(FieldTitle)`
  position: relative;
`;

const PreviewButton = styled(Button)`
  position: absolute;
  right: 0;
  bottom: -1px;
`;

const TextArea = styled.textarea`
  min-width: 100%;
  max-width: 100%;
  min-height: 400px;
  padding: 12px;
  border: none;
  background-color: ${props => !props.english ? '#f3f3f3' : '#ebecf6'};
  outline: none;
`;

class MarkdownEditor extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      preview: false
    };
  }

  togglePreview = () => {
    this.setState(over(lensProp('preview'), not));
  };

  render() {
    const {inputClassName, onChange, source, title} = this.props;
    const inputClassNames = classnames('input', inputClassName);

    return (
      <div>
        {
          this.state.preview &&
          <div className='inputWrapper'>
            <DescriptionTitle english={ title === 'eng' }>
              { title }
              <PreviewButton onClick={ this.togglePreview }>
                Редактировать
              </PreviewButton>
            </DescriptionTitle>
            <ReactMarkdown source={ source }/>
          </div>
        }
        {
          !this.state.preview &&
          <div className='inputWrapper'>
            <DescriptionTitle english={ title === 'eng' }>
              { title }
              <PreviewButton onClick={ this.togglePreview }>
                Просмотр
              </PreviewButton>
            </DescriptionTitle>
            <TextArea
              onChange={ onChange }
              className={ inputClassNames }
              defaultValue={ source }
              english={ title === 'eng' }
            />
            <div className='inputLine'/>
          </div>
        }
      </div>
    );
  }
}

export default MarkdownEditor;