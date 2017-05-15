import React from 'react';
import PropTypes from 'prop-types';

import { Wrap, SelectStyled } from './HeaderStyles';
import StyledButton from '../StyledButton';
import search from '../icons/btn-search.svg';
import info from '../icons/btn-info.svg';

const Header = (props) => {
  const {
    currentYear, currentLanguage, openInfoCard, openSearchCard, changeLanguage
  } = props;

  return (
    <Wrap>
      <StyledButton onClick={openSearchCard}>
        <img src={search} alt='loupe-icon' />
      </StyledButton>
      <div>{ `${currentYear}\nгод` }</div>
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
      <StyledButton onClick={openInfoCard}>
        <img src={info} alt='info-sign' />
      </StyledButton>
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
