import React from 'react';
import ReactMarkdown from 'react-markdown';
import { lensProp, not, over } from 'ramda';

const MarkdownEditor = React.createClass({
  getInitialState() {
    return {
      preview: false
    };
  },

  togglePreview() {
    this.setState(over(lensProp('preview'), not, this.state));
  },

  render() {
    const { onChange, source, title } = this.props;

    return (
      <div className='prison__description'>
        <div className='field-title'>{ title }</div>
        {
          this.state.preview &&
          <div className='inputWrapper'>
            <button onClick={ this.togglePreview }>Редактировать</button> 
            <ReactMarkdown
              className='input'
              source={ source }
            />
            <div className='inputLine'/>
          </div>
        }
        {
          !this.state.preview &&
          <div className='inputWrapper'>
            <button onClick={ this.togglePreview }>Просмотр</button> 
            <textarea
              onChange={ onChange }
              className='input'
              defaultValue={ source }
            />
            <div className='inputLine'/>
          </div>
        }
      </div>
    );
  }
});

export default MarkdownEditor;
