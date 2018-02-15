import styled from 'styled-components';

export default styled.button`
  position: absolute;
  right: 0;
  padding: 23px 5px 4px 54px;
  border-radius: 4px;
  background-color: #fff;
  border: solid 1px rgba(0, 0, 0, 0.5);
  font-family: 'Formular';
  font-size: 15px;
  outline: none;
  opacity: 0;
  z-index: -10;
  transition: opacity .3s;
  input:valid + & {
    z-index: inherit;
    opacity: 1;
    transition: opacity .3s;
  }
  &:hover {
    background-color: #f0f0f0;
  }
  &:active {
    border-color: #000;
  }
`;
