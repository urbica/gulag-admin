import React from 'react';
import Button from '../Button';
import {Link} from 'react-router';
import styled from 'styled-components';

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex: 100%;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, .3);
  margin-bottom: 50px;
`;

const BackLink = styled(Link)`
  font-size: 12px;
  font-weight: bold;
  color: #000;
  text-transform: uppercase;
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

const calculatePeriod = (features) => {
  return features.map((location, key) => {
    const YEARS = Object.keys(location.properties);
    if (YEARS.length === 1) {
      return <div key={ key }>{ YEARS[0] };</div>
    } else if (YEARS.length > 1) {
      return <div key={ key }>{ YEARS[0] + ' – ' + YEARS[YEARS.length - 1] };</div>
    } else return null
  });
};

const PrisonHeader = (props) => {
  const {prison, deleteHandler} = props;
  const features = prison.features || [];

  return (
    <Header>
      <BackLink to='/admin/prisons'>
        ← к таблице лагерей
      </BackLink>
      <div>
        <PrisonName>{ prison.name_ru }</PrisonName>
        <PrisonPeriod>{ calculatePeriod(features) }</PrisonPeriod>
      </div>
      <div>
        <Button color={ 'red' }
                onClick={ deleteHandler }
        >
          удалить
        </Button>
        <PrisonSaved>
          <div>Сохранено:</div>
          <span>{ prison.updated_at }</span>
        </PrisonSaved>
      </div>
    </Header>
  );
};

export default PrisonHeader;