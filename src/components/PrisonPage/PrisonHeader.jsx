import React from 'react';
import Button from '../Button';
import moment from 'moment';
import { Link } from 'react-router';
import styled from 'styled-components';
import { getPeriods } from '../../utils/utils';

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex: 100%;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, .3);
`;

const BackLink = styled(Link)`
  font-size: 12px;
  font-weight: bold;
  color: #000;
  text-transform: uppercase;
  text-decoration: none;
  transition: .2s;
  &:hover {
    opacity: .5;
    transition: .2s;
  }
`;

const PrisonName = styled.div`
  max-width: 600px;
  margin-bottom: 10px;
  font-size: 36px;
  font-weight: bold;
  text-align: center;
`;

const PrisonPeriod = styled.div`
  opacity: 0.5;
  font-size: 12px;
  font-weight: normal;
  text-align: center;
  color: #000;
`;

const PrisonSaved = styled.div`
  margin-top: 5px;
  opacity: 0.5;
  font-size: 12px;
  font-weight: normal;
`;

const PrisonHeader = (props) => {
  const { prison, deleteHandler } = props;

  return (
    <Header>
      <BackLink to='/admin/prisons'>
        ← к таблице лагерей
      </BackLink>
      <div>
        <PrisonName>{ prison.name.ru }</PrisonName>
        <PrisonPeriod>{ getPeriods(prison) }</PrisonPeriod>
      </div>
      <div>
        <Button
          color={ 'red' }
          onClick={ deleteHandler }
        >
          удалить
        </Button>
        <PrisonSaved>
          <div>Сохранено:</div>
          <span>{ moment(prison.updated_at).locale('ru').format('DD MMM YYYY, HH:mm:ss') }</span>
        </PrisonSaved>
      </div>
    </Header>
  );
};

export default PrisonHeader;
