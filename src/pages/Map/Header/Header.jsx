import React from 'react';
import PropTypes from 'prop-types';
import { Wrap, SelectStyled, InfoButton } from './HeaderStyles';
import info from './info.svg';

const Header = (props) => {
  const {
    currentYear, currentPrisons, currentLanguage, openInfoCard, openSearchCard, changeLanguage
  } = props;

  return (
    <Wrap>
      <div>{ `${currentYear}\nгод` }</div>
      <div>{ currentPrisons.length }</div>
      <button onClick={openSearchCard}>search</button>
      <SelectStyled
        value={currentLanguage}
        options={[
          { value: 'ru', label: 'РУС' },
          { value: 'en', label: 'ENG' },
          { value: 'de', label: 'DEU' }
        ]}
        onChange={changeLanguage}
      />
      <InfoButton onClick={openInfoCard}>
        <img src={info} alt='info-sign' />
      </InfoButton>
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
