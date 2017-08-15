/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import styled from 'styled-components';
import debounce from 'debounce';
import FieldTitle from './FieldTitle';
import TextInput from './TextInput';
import searchIcon from './search.svg';

const Wrap = styled.div`
  width: 100%;
`;

const SearchWrap = styled.label`
  position: relative;
  width: 100%;
  cursor: text;
  & img {
    position: absolute;
    bottom: 15px;
    left: 12px;
  }
  & label input {
    text-indent: 30px;
  }
`;

const Title = styled(FieldTitle)`
  font-size: 48px;
  text-transform: capitalize;
`;

const Search = (props) => {
  const onChange = event => props.onChange(event.target.value);
  const delayedOnChange = debounce(onChange, 300);

  const handleOnChange = (event) => {
    event.persist();
    delayedOnChange(event);
  };

  return (
    <Wrap>
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
    </Wrap>
  );
};

export default Search;
