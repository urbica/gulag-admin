import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Wrap, SelectStyled } from './HeaderStyles';
import { HeaderButton } from '../StyledButtons';
import search from '../icons/btn-search.svg';
import info from '../icons/btn-info.svg';
import { splitDigits } from '../../../utils/utils';

const Group = styled.div`
  margin-left: 30px;
  & div:last-child {
    font-size: 12px;
    opacity: .5;
  }
`;

const Header = (props) => {
  const {
    currentYear, currentLanguage, openInfoCard, openSearchCard, changeLanguage
  } = props;

  return (
    <Wrap>
      <HeaderButton onClick={openSearchCard}>
        <img src={search} alt='loupe-icon' />
      </HeaderButton>
      <Group>
        <div>{ `${(currentYear === 'all') ? '1936 – 1956' : currentYear}` }</div>
        <div>{ `${(currentYear === 'all') ? 'годы' : 'год'}` }</div>
      </Group>
      <Group>
        <div>{splitDigits(34567)}</div>
        <div>умерших</div>
      </Group>
      <Group>
        <div>{splitDigits(34567)}</div>
        <div>умерших</div>
      </Group>
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
