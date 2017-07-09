import React from 'react';
import PropTypes from 'prop-types';
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
  font-family: 'Formular';
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
        Object.keys(languages).map(language => (
          <Button
            key={language}
            active={language === activeLang}
            width={buttonWidth}
            onClick={onChange.bind(null, language)}
          >
            { languages[language] }
          </Button>
        ))
      }
    </LangChangerWrap>
  );
};

LanguageChanger.propTypes = {
  languages: PropTypes.object.isRequired,
  activeLang: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default LanguageChanger;
