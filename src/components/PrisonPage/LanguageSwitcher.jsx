import React from 'react';
import styled from 'styled-components';

const LangChangerWrap = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 5px;
  background-color: #f3f3f3;
`;

const Button = styled.button`
  width: ${props => props.width};
  height: 40px;
  border: none;
  background-color: ${props => props.active ? '#fff' : 'transparent'};
  font-family: 'PT Sans';
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
`;

const LanguageChanger = (props) => {
  const { languages, activeLang, onChange } = props;
  const buttonWidth = `${100 / Object.keys(languages).length}%`;

  return (
    <LangChangerWrap>
      {
        Object.keys(languages).map((language, index) => {
          return (
            <Button
              key={ index }
              active={ language === activeLang }
              width={ buttonWidth }
              onClick={ onChange.bind(null, language)}
            >
              { languages[language] }
            </Button>
          )
        })
      }
    </LangChangerWrap>
  )
};

LanguageChanger.propTypes = {
  languages: React.PropTypes.object.isRequired,
  activeLang: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired
};

export default LanguageChanger;