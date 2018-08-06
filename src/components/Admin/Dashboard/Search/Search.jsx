import React from 'react';
import PropTypes from 'prop-types';

// icons
import searchIcon from './search.svg';

// component
import TextInput from '../../TextInput/TextInput';

// styled
import Container from './styled/Container';
import SearchWrap from './styled/SearchWrap';
import Title from './styled/Title';

const Search = ({ searchQuery, changeSearchQuery }) => {
  const changeSearchQueryHandle = event => {
    event.persist();
    changeSearchQuery(event.target.value);
  };

  return (
    <Container>
      <Title>
        Лагеря
      </Title>
      <SearchWrap>
        <TextInput
          value={searchQuery}
          onChange={changeSearchQueryHandle}
          placeholder='Поиск'
        />
        <img src={searchIcon} alt='Search' />
      </SearchWrap>
    </Container>
  );
};

Search.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  changeSearchQuery: PropTypes.func.isRequired
};

export default Search;
