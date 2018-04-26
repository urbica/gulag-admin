import styled from 'styled-components';

export default styled.textarea`
  max-width: 100%;
  min-width: 100%;
  min-height: 300px;
  padding: 13px;
  border: none;
  background-color: #f3f3f3;
  outline: none;
  &:hover {
    background-color: #f9f9f9;
  }
  &:focus + div {
    width: 100%;
  }
`;
