import React from 'react';
import ReactMarkdown from 'react-markdown';
import { lensProp, not, over } from 'ramda';

class MarkdownEditor extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      preview: false
    };
  }

  togglePreview = () => {
    this.setState(over(lensProp('preview'), not));
  }

  render() {
    const {lang, onChange, source, title} = this.props;
    const inputName = lang !== 'en' ? 'input' : 'input input_en';
    const descName = lang !== 'en' ? 'prison__description' : 'prison__description prison__description_en';
    return (
      <div className={ descName }>
        <div className='field-title'>{ title }</div>
        {
          this.state.preview &&
          <div className='inputWrapper'>
            <button onClick={ this.togglePreview }>Редактировать</button>
            <ReactMarkdown
              className={ inputName }
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
              className={ inputName }
              defaultValue={ source }
            />
            <div className='inputLine'/>
          </div>
        }
      </div>
    );
  }
};

export default MarkdownEditor;
