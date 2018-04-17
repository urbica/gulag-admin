import styled from 'styled-components';

export default styled.button`
  position: relative;

  width: 20px;
  height: 20px;
  padding: 0;
  border: solid 1px #b2b2b2;
  border-radius: 2px;
  margin-left: 3px;

  outline: none;

  text-align: center;
  color: rgba(0, 0, 0, 0.5);

  background-color: transparent;

  &:hover {
    color: #000;
    background-color: #f0f0f0;
    cursor: pointer;
  }

  &:active {
    border-color: #000;
  }
`;
