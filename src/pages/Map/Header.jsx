import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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

const Header = (props) => {
  const { currentYear, currentPrisons, openInfoCard } = props;

  return (
    <Wrap>
      <div>{ `${currentYear}\nгод` }</div>
      <div>{ currentPrisons.length }</div>
      <button onClick={openInfoCard}>info</button>
    </Wrap>
  );
};

Header.propTypes = {
  currentYear: PropTypes.number,
  currentPrisons: PropTypes.arrayOf(
    PropTypes.object
  ),
  openInfoCard: PropTypes.func
};

export default Header;
