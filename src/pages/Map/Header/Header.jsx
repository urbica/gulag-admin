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

  const showAmountsGroup = currentYear !== 'all';

  const prisonersAmount = showAmountsGroup && formatedData[currentYear].prisoners !== 0 ?
    splitDigits(formatedData[currentYear].prisoners) : 'данные уточняются';
  const deadAmount = showAmountsGroup && formatedData[currentYear].dead !== 0 ?
    splitDigits(formatedData[currentYear].dead) : 'данные уточняются';

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
        showAmountsGroup &&
        <Group>
          <div>{prisonersAmount}</div>
          <div>заключенных</div>
        </Group>
      }
      {
        showAmountsGroup &&
        <Group>
          <div>{deadAmount}</div>
          <div>умерших</div>
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
