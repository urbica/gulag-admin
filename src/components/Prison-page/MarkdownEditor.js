import React from 'react';
import ReactMarkdown from 'react-markdown';

class MarkdownEditor extends React.Component {
  render() {
    const { source, title } = this.props;
    return (
      <div className='prison__description'>
        <div className='field-title'>{ title }</div>
        <div className='inputWrapper'>
          <ReactMarkdown className='input' source={ source } />
          {/*
            <textarea
              className='input'
              defaultValue={ PRISON.description_ru }
            />
          */}
          <div className='inputLine'/>
        </div>
      </div>
    );
  }
}

export default MarkdownEditor;
