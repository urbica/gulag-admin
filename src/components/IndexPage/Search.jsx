import React from 'react';
import styled from 'styled-components';
import TextInput from '../TextInput';
import debounce from 'debounce';
import searchIcon from './search.svg';

const SearchWrap = styled.label`
  position: relative;
  width: 100%;
  cursor: text;
  & img {
    position: absolute;
    top: 50%;
    left: 12px;
    transform: translateY(-50%);
  }
  & label input {
    text-indent: 30px;
  }
`;

const Search = (props) => {
  const onChange = (event) => props.onChange(event.target.value);
  const delayedOnChange = debounce(onChange, 300);

  const handleOnChange = (event) => {
    event.persist();
    delayedOnChange(event);
  };

  return (
    <SearchWrap>
      <TextInput
        onChange={ handleOnChange }
        placeholder={ 'Поиск' }
      />
      <img src={ searchIcon } alt={ 'Search' }/>
    </SearchWrap>
  )
};

export default Search;
