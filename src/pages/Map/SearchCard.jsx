import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrap = styled.div`
  display: ${({ visible }) => visible ? 'block' : 'none'};
  position: fixed;
  top: 0;
  bottom: 0;
  width: 430px;
  overflow: scroll;
  color: #fff;
  background-color: #222;
  z-index: 2;
  & a {
    color: #fff;
  }
`;

const SearchCard = (props) => {
  const { visible, closeSearchCard, prisons } = props;

  return (
    <Wrap visible={visible}>
      <button onClick={closeSearchCard}>close</button>
      {
        Object.values(prisons).map(p => (
          <div key={p.id}>
            <Link to={`/prison${p.id}`}>
              {p.name.ru}
            </Link>
          </div>
        ))
      }
    </Wrap>
  );
};

SearchCard.propTypes = {
  visible: PropTypes.bool,
  closeSearchCard: PropTypes.func
};

export default SearchCard;
