import React from 'react';
import styled from 'styled-components';

const SearchWrap = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 30px;
  & .fa-search {
    position: absolute;
    top: 50%;
    left: 12px;
    transform: translateY(-50%);
    opacity: .2;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 13px 12px;
  border: none;
  text-indent: 30px;
  outline: none;
  background-color: #f3f3f3;
  &:hover {
    background-color: #f9f9f9;
  }
  &:focus {
    background-color: #f9f9f9;
  }
`;

const InputUnderline = styled.div`
  width: 0;
  height: 2px;
  background-color: #000;
  transition: width .3s;
  input:focus + & {
    width: 100%;
    transition: width .3s;
  }
`;

class Search extends React.Component {
  render() {
    return (
      <SearchWrap>
        <span className="fa fa-search"/>
        <Input
          type="text"
          placeholder="Поиск"
          onChange={ this.props.search }
        />
        <InputUnderline/>
      </SearchWrap>
    )
  }
}

export default Search;