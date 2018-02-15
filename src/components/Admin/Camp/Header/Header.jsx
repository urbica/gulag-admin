import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

// styled
import Container from './Container';
import BackLink from './BackLink';
import Title from './Title';
import Subtitle from './Subtitle';
import Button from '../../Button';
import PrisonSaved from './PrisonSaved';

// utils
import { getPeriods } from '../../../../utils/utils';

const Header = ({ camp, updateCamp }) => (
  <Container>
    <BackLink to='/admin'>← к таблице лагерей</BackLink>
    <div>
      <Title>{camp.getIn(['name', 'ru'])}</Title>
      <Subtitle>{getPeriods(camp.toJS())}</Subtitle>
    </div>
    <div>
      <Button
        color='orange'
        onClick={updateCamp}
      >
        сохранить
      </Button>
      <PrisonSaved>
        <div>Сохранено:</div>
        <span>
          {moment(camp.get('updated_at'))
            .locale('ru')
            .format('DD.MM.YY, HH:mm')}
        </span>
      </PrisonSaved>
    </div>
  </Container>
);

Header.propTypes = {
  camp: PropTypes.object.isRequired,
  updateCamp: PropTypes.func.isRequired
};

export default Header;
