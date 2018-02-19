import React from 'react';
import PropTypes from 'prop-types';

import Container from './Container';
import Button from './Button';

const LanguageSwitcher = ({ languages, activeLang, onChange }) => {
  const buttonWidth = `${100 / Object.keys(languages).length}%`;

  return (
    <Container>
      {Object.keys(languages)
        .map(language => (
          <Button
            key={language}
            active={language === activeLang}
            width={buttonWidth}
            onClick={onChange.bind(null, language)}
          >
            {languages[language]}
          </Button>
        ))}
    </Container>
  );
};

LanguageSwitcher.propTypes = {
  languages: PropTypes.object.isRequired,
  activeLang: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default LanguageSwitcher;
