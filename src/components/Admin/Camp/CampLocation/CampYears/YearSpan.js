import styled from 'styled-components';

export default styled.span`
  display: inline-block;
  width: 100%;
  padding-top: 6px;
  padding-bottom: 5px;
  border-radius: 3px;
  font-size: 16px;
  &:hover {
    background-color: #f3f3f3;
    cursor: pointer;
  }
  input:checked + & {
    color: #fff;
    background-color: #4a4a4a;
    &:hover {
      background: rgba(0, 0, 0, 1);
    }
  }
  input:disabled + & {
    color: #fff;
    background-color: rgba(74, 74, 74, 0.3);
  }
`;
