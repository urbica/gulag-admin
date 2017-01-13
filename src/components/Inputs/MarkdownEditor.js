import React from 'react';
import classnames from 'classnames';
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
    const { inputClassName, containerClassName, onChange, source, title } = this.props;
    const inputClassNames = classnames('input', inputClassName);
    const containerClassNames = classnames('prison__description', containerClassName);

    return (
      <div className={ containerClassNames }>
        <div className='field-title'>{ title }</div>
        {
          this.state.preview &&
          <div className='inputWrapper'>
            <button onClick={ this.togglePreview }>Редактировать</button>
            <ReactMarkdown source={ source }/>
            <div className='inputLine'/>
          </div>
        }
        {
          !this.state.preview &&
          <div className='inputWrapper'>
            <button onClick={ this.togglePreview }>Просмотр</button>
            <textarea
              onChange={ onChange }
              className={ inputClassNames }
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
