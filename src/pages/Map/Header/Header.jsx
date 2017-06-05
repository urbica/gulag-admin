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
  display: flex;
  align-items: center;
  margin-left: 30px;
  & svg {
    margin-right: 5px;
  }
  @media (max-width: 1023px) {
    & svg {
      display: none;
    }
  }
  @media (max-width: 375px) {
    width: 100%;
    margin-left: 5px;
    text-align: center;
  }
`;

const YearGroup = styled(Group)`
  max-width: 65px;
`;

const Amount = styled.div`
  padding-top: 2px;
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
  const dataSearchingStr = 'данные уточняются';
  let notMobile = true;

  if (width < 530) {
    notMobile = false;
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
      <YearGroup>
        <div>
          {`${(currentYear === 'all') ? '1918 – 1960' : currentYear}\n`}
          <Desc>{ `${(currentYear === 'all') ? 'годы' : 'год'}` }</Desc>
        </div>
      </YearGroup>
      {
        showAmountsGroup &&
        notMobile &&
        <Group>
          <svg xmlns='http://www.w3.org/2000/svg' width='22' height='28' viewBox='0 0 22 28'>
            <g fill='#FFF' fillRule='evenodd'>
              <path d='M0 0h22v28H0z' opacity='.1' />
              <path d='M0 0h22v2H0z' />
            </g>
          </svg>
          <div>
            <Amount>{`${prisonersAmount}\n`}</Amount>
            <Desc>заключенных</Desc>
          </div>
        </Group>
      }
      {
        showAmountsGroup &&
        notMobile &&
        <Group>
          <svg xmlns='http://www.w3.org/2000/svg' width='22' height='28' viewBox='0 0 22 28'>
            <g fill='none' fillRule='evenodd'>
              <path fill='#544B52' d='M0 0h22v28H0z' opacity='.5' />
              <path fill='#FF4127' d='M0 0h22v2H0z' />
            </g>
          </svg>
          <div>
            <Amount>{`${deadAmount}\n`}</Amount>
            <Desc>умерших</Desc>
          </div>
        </Group>
      }
      {
        !showAmountsGroup &&
        <Group>
          <svg xmlns='http://www.w3.org/2000/svg' width='35' height='35' viewBox='0 0 35 35'>
            <g fill='#E53F02' fillRule='evenodd'>
              <circle cx='17.5' cy='17.5' r='17.5' opacity='.3' />
              <circle cx='18' cy='18' r='1' />
            </g>
          </svg>
          <div>
            {`${props.prisonsAmount}\n`}
            <Desc>лагеря</Desc>
          </div>
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
