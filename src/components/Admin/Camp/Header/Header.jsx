import React from 'react';
import PropTypes from 'prop-types';

// styled
import Container from './Container';
import BackLink from './BackLink';
import Title from './Title';
import Subtitle from './Subtitle';
import Button from '../../Button';
import PrisonSaved from './PrisonSaved';

const Header = ({ title, periods, updatedAt, updateCamp }) => (
  <Container>
    <BackLink to='/admin'>
      ← к таблице лагерей
    </BackLink>
    <div>
      <Title>
        {title}
      </Title>
      <Subtitle>
        {periods}
      </Subtitle>
    </div>
    <div>
      <Button color='orange' onClick={updateCamp}>
        сохранить
      </Button>
      <PrisonSaved>
        <div>
          Сохранено:
        </div>
        <span>
          {updatedAt}
        </span>
      </PrisonSaved>
    </div>
  </Container>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
  periods: PropTypes.arrayOf(PropTypes.string).isRequired,
  updatedAt: PropTypes.string.isRequired,
  updateCamp: PropTypes.func.isRequired
};

export default Header;
