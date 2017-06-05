import React from 'react';
import PropTypes from 'prop-types';

import {
  Wrap, HeaderCenterGroup, Desc, Amount, Group
} from './HeaderStyles';
import { HeaderButton } from '../StyledButtons';
import search from '../icons/btn-search.svg';
import info from '../icons/btn-info.svg';
import data from '../../../utils/prisonersAmountByYears';
import { splitDigits } from '../../../utils/utils';

const formatedData = {};
data.map(d => (formatedData[d.year] = d));

const Header = (props) => {
  const { currentYear, openInfoCard, openSearchCard, width } = props;

  const showAmountsGroup = currentYear !== 'all';
  const dataSearchingStr = 'данные уточняются';
  let notMobilePrisoners = true;
  let notMobileDead = true;

  if (width < 530) {
    notMobilePrisoners = formatedData[currentYear].prisoners !== 0;
    notMobileDead = formatedData[currentYear].dead !== 0;
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
      <HeaderCenterGroup>
        <Group>
          <div>
            {`${(currentYear === 'all') ? '1918 – 1960' : currentYear}\n`}
            <Desc>{ `${(currentYear === 'all') ? 'годы' : 'год'}` }</Desc>
          </div>
        </Group>
        {
          showAmountsGroup &&
          notMobilePrisoners &&
          <Group>
            <svg xmlns='http://www.w3.org/2000/svg' width='22' height='37'>
              <g fill='#FFF' fillRule='evenodd'>
                <path d='M0 0h22v37H0z' opacity='.1' />
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
          notMobileDead &&
          <Group>
            <svg xmlns='http://www.w3.org/2000/svg' width='22' height='37'>
              <g fill='none' fillRule='evenodd'>
                <path fill='#544B52' d='M0 0h22v37H0z' opacity='.5' />
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
      </HeaderCenterGroup>
      <HeaderButton onClick={openInfoCard}>
        <img src={info} alt='info-sign' />
      </HeaderButton>
    </Wrap>
  );
};

Header.propTypes = {
  currentYear: PropTypes.number,
  openInfoCard: PropTypes.func,
  openSearchCard: PropTypes.func,
  width: PropTypes.number
};

export default Header;
