import React from 'react';
import PropTypes from 'prop-types';

import { Wrap, SelectStyled, Button } from './HeaderStyles';
import info from './info.svg';
import search from './search.svg';

const Header = (props) => {
  const {
    currentYear, currentPrisons, currentLanguage, openInfoCard, openSearchCard, changeLanguage
  } = props;

  return (
    <Wrap>
      <div>{ `${currentYear}\nгод` }</div>
      <div>{ `${currentPrisons.length}\nлагерей` }</div>
      <Button onClick={openSearchCard}>
        <img src={search} alt='loupe-icon' />
      </Button>
      <SelectStyled
        value={currentLanguage}
        options={[
          { value: 'ru', label: 'РУС' },
          { value: 'en', label: 'ENG' },
          { value: 'de', label: 'DEU' }
        ]}
        onChange={changeLanguage}
        searchable={false}
        clearable={false}
      />
      <Button onClick={openInfoCard}>
        <img src={info} alt='info-sign' />
      </Button>
    </Wrap>
  );
};

Header.propTypes = {
  currentYear: PropTypes.number,
  currentPrisons: PropTypes.arrayOf(
    PropTypes.object
  ),
  currentLanguage: PropTypes.string,
  openInfoCard: PropTypes.func,
  openSearchCard: PropTypes.func,
  changeLanguage: PropTypes.func
};

export default Header;
