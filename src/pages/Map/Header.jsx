import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Select from 'react-select';

const Wrap = styled.header`
  position: fixed;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 20px 40px;
  background-color: rgba(0,0,0,.4);
  white-space: pre;
  color: #fff;
  z-index: 1;
  & div {
    margin-right: 5px;
  }
`;

const SelectStyled = styled(Select)`
  margin-left: auto;
`;

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
      <button onClick={openInfoCard}>info</button>
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
