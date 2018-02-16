import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'debounce';

// icons
import searchIcon from './search.svg';

// container
import TextInput from '../../TextInput/TextInput';

// styled
import Container from './Container';
import SearchWrap from './SearchWrap';
import Title from './Title';

const Search = (props) => {
  const onChange = event => props.onChange(event.target.value);
  const delayedOnChange = debounce(onChange, 300);

  const handleOnChange = (event) => {
    event.persist();
    delayedOnChange(event);
  };

  return (
    <Container>
      <Title>Лагеря</Title>
      <SearchWrap>
        <TextInput
          onChange={handleOnChange}
          placeholder='Поиск'
        />
        <img
          src={searchIcon}
          alt='Search'
        />
      </SearchWrap>
    </Container>
  );
};

Search.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default Search;
