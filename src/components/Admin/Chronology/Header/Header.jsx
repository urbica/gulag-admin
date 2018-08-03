import React from 'react';
import PropTypes from 'prop-types';

// styled
import Container from './Container';
import BackButton from './BackButton';
import Title from './Title';
import SaveButton from './SaveButton';

const Header = ({ goBack, updatePeriods }) => (
  <Container>
    <BackButton onClick={goBack}>
      ← к таблице лагерей
    </BackButton>
    <Title>
      Хронология ГУЛАГа
    </Title>
    <div>
      <SaveButton onClick={updatePeriods}>
        сохранить
      </SaveButton>
    </div>
  </Container>
);

Header.propTypes = {
  goBack: PropTypes.func.isRequired,
  updatePeriods: PropTypes.func.isRequired
};

export default Header;
