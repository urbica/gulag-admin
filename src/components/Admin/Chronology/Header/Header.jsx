import React from 'react';
import PropTypes from 'prop-types';

// styled
import Container from './Container';
import BackButton from './BackButton';
import Title from './Title';
import SaveButton from './SaveButton';

const Header = ({ goBack }) => (
  <Container>
    <BackButton onClick={goBack}>← к таблице лагерей</BackButton>
    <Title>Хронология Гулага</Title>
    <div>
      <SaveButton>сохранить</SaveButton>
      <div>blabla</div>
    </div>
  </Container>
);

Header.propTypes = {
  goBack: PropTypes.func.isRequired
};

export default Header;
