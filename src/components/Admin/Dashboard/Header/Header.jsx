import React from 'react';
import PropTypes from 'prop-types';

// styled
import Container from './Container';
import Button from '../../Button';
import Title from './Title';
import Lang from './Lang';
import PrisonsCount from './PrisonsCount';

const Header = props => {
  const {
    campsCount,
    publishedRuCount,
    publishedEnCount,
    publishedDeCount,
    logout,
    createCamp
  } = props;

  return (
    <Container>
      <Button onClick={logout}>
        Выйти
      </Button>
      <div>
        <Title>
          Опубликовано лагерей
        </Title>
        <div>
          <Lang>
            <PrisonsCount>
              {publishedRuCount}
              <span>
                {`/${campsCount}`}
              </span>
            </PrisonsCount>
            На русском
          </Lang>
          <Lang>
            <PrisonsCount>
              {publishedEnCount}
              <span>
                {`/${campsCount}`}
              </span>
            </PrisonsCount>
            На английском
          </Lang>
          <Lang>
            <PrisonsCount>
              {publishedDeCount}
              <span>
                {`/${campsCount}`}
              </span>
            </PrisonsCount>
            На немецком
          </Lang>
        </div>
      </div>
      <Button color='orange' onClick={createCamp}>
        Добавить лагерь
      </Button>
    </Container>
  );
};

Header.propTypes = {
  campsCount: PropTypes.number.isRequired,
  publishedRuCount: PropTypes.number.isRequired,
  publishedEnCount: PropTypes.number.isRequired,
  publishedDeCount: PropTypes.number.isRequired,
  logout: PropTypes.func.isRequired,
  createCamp: PropTypes.func.isRequired
};

export default Header;
