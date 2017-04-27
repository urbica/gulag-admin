import styled from 'styled-components';
import Select from 'react-select';

export const Wrap = styled.header`
  position: fixed;
  display: flex;
  align-items: center;
  width: 100%;
  padding-left: 60px;
  background-color: rgba(0,0,0,.4);
  white-space: pre;
  color: #fff;
  z-index: 1;
  & div {
    margin-right: 5px;
  }
`;

export const SelectStyled = styled(Select)`
  margin-left: auto;
`;

export const InfoButton = styled.button`
  padding: 23px;
  border: none;
  margin: 0;
  background-color: transparent;
  &:hover {
    background-color: #101418;
  }
`;
