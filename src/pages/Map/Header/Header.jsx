import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Wrap, SelectStyled } from './HeaderStyles';
import { HeaderButton } from '../StyledButtons';
import search from '../icons/btn-search.svg';
import info from '../icons/btn-info.svg';
import data from '../../../utils/prisonersAmountByYears';
import { splitDigits } from '../../../utils/utils';

const Group = styled.div`
  margin-left: 30px;
  & div:last-child {
    font-size: 12px;
    opacity: .5;
  }
`;

const formatedData = {};
data.map(d => (formatedData[d.year] = d));

const Header = (props) => {
  const {
    currentYear, currentLanguage, openInfoCard, openSearchCard, changeLanguage
  } = props;

  const showPrisoners = currentYear !== 'all';
  const showDead = currentYear !== 'all';

  return (
    <Wrap>
      <HeaderButton onClick={openSearchCard}>
        <img src={search} alt='loupe-icon' />
      </HeaderButton>
      <Group>
        <div>{ `${(currentYear === 'all') ? '1918 – 1960' : currentYear}` }</div>
        <div>{ `${(currentYear === 'all') ? 'годы' : 'год'}` }</div>
      </Group>
      {
        showPrisoners &&
        formatedData[currentYear].prisoners !== 0 &&
        <Group>
          <div>{splitDigits(formatedData[currentYear].prisoners)}</div>
          <div>заключенных</div>
        </Group>
      }
      {
        showDead &&
        formatedData[currentYear].dead !== 0 &&
        <Group>
          <div>{splitDigits(formatedData[currentYear].dead)}</div>
          <div>умерших</div>
        </Group>
      }
      {
        (currentYear < 1930 || currentYear > 1956) &&
        <Group>
          <div>данные уточняются</div>
        </Group>
      }
      <SelectStyled
        value={currentLanguage}
        options={[
          { value: 'ru', label: 'RUS' },
          { value: 'en', label: 'ENG' },
          { value: 'de', label: 'DEU' }
        ]}
        onChange={changeLanguage}
        searchable={false}
        clearable={false}
      />
      <HeaderButton onClick={openInfoCard}>
        <img src={info} alt='info-sign' />
      </HeaderButton>
    </Wrap>
  );
};

Header.propTypes = {
  currentYear: PropTypes.number,
  currentLanguage: PropTypes.string,
  openInfoCard: PropTypes.func,
  openSearchCard: PropTypes.func,
  changeLanguage: PropTypes.func
};

export default Header;
