import styled from 'styled-components';

export default styled.button`
  width: 50px;
  padding: 0;
  border-style: solid;
  border-width: 1px;
  border-color: transparent;
  margin: 0;
  background-color: transparent;
  outline: none;
  & img {
    width: 100%;
    opacity: 0.8;
  }
  &:hover {
    background-color: rgba(0,0,0,.4);
  }
  &:active {
    background-color: rgba(0,0,0,.5);
  }
  &:focus {
    border-color: #9CA2A9;
  }
`;
