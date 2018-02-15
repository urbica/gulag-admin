import styled from 'styled-components';

export default styled.label`
  position: relative;

  display: flex;
  align-items: baseline;
  padding: 13px 12px;

  background-color: #f3f3f3;
  cursor: text;

  &:hover,
  &:hover input{
    background-color: #f9f9f9;
  }
`;
