import React from 'react';
import PropTypes from 'prop-types';
import styled, { injectGlobal } from 'styled-components';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import { Wrap, SelectStyled } from './HeaderStyles';
import { HeaderButton } from '../StyledButtons';
import search from '../icons/btn-search.svg';
import info from '../icons/btn-info.svg';
import data from '../../../utils/prisonersAmountByYears';
import { splitDigits } from '../../../utils/utils';

// eslint-disable-next-line
injectGlobal`
  .example-appear,
  .example-enter {
    color: #eb4200;
  }
  
  .example-appear.example-appear-active,
  .example-enter.example-enter-active {
    color: #fff;
    transition: color .5s ease-in;
  }
`;

const Group = styled.div`
  margin-left: 30px;
  @media (max-width: 375px) {
    width: 100%;
    margin-left: 5px;
    text-align: center;
  }
`;

const Desc = styled.span`
  font-size: 12px;
  opacity: .5;
`;

const formatedData = {};
data.map(d => (formatedData[d.year] = d));

const Header = (props) => {
  const {
    currentYear, currentLanguage, openInfoCard, openSearchCard, changeLanguage, width
  } = props;

  const showAmountsGroup = currentYear !== 'all';
  let dataSearchingStr;

  if (width < 530) {
    dataSearchingStr = '–––';
  } else {
    dataSearchingStr = 'данные уточняются';
  }

  const prisonersAmount = showAmountsGroup && formatedData[currentYear].prisoners !== 0 ?
    splitDigits(formatedData[currentYear].prisoners) : dataSearchingStr;
  const deadAmount = showAmountsGroup && formatedData[currentYear].dead !== 0 ?
    splitDigits(formatedData[currentYear].dead) : dataSearchingStr;

  return (
    <Wrap>
      <HeaderButton onClick={openSearchCard}>
        <img src={search} alt='loupe-icon' />
      </HeaderButton>
      <Group>
        { `${(currentYear === 'all') ? '1918 – 1960' : currentYear}\n` }
        <Desc>{ `${(currentYear === 'all') ? 'годы' : 'год'}` }</Desc>
      </Group>
      {
        showAmountsGroup &&
        <Group>
          {`${prisonersAmount}\n`}
          <Desc>заключенных</Desc>
        </Group>
      }
      {
        showAmountsGroup &&
        <Group>
          <CSSTransitionGroup
            transitionName='example'
            transitionLeave={false}
          >
            <div key={deadAmount}>{deadAmount}</div>
          </CSSTransitionGroup>
          <Desc>умерших</Desc>
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
  changeLanguage: PropTypes.func,
  width: PropTypes.number
};

export default Header;
