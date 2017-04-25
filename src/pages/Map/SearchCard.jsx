import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrap = styled.div`
  display: ${({ visible }) => visible ? 'block' : 'none'};
  position: absolute;
  top: 0;
  bottom: 0;
  width: 430px;
  color: #fff;
  background-color: #222;
  z-index: 2;
`;

const SearchCard = (props) => {
  const { visible, closeSearchCard } = props;

  return (
    <Wrap visible={visible}>
      search
      <button onClick={closeSearchCard}>close</button>
    </Wrap>
  );
};

SearchCard.propTypes = {
  visible: PropTypes.bool,
  closeSearchCard: PropTypes.func
};

export default SearchCard;
