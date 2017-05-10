import styled from 'styled-components';

const Controls = styled.div`
  position: absolute;
  top: calc(${({ slideUp }) => slideUp ? '36%' : '50%'} - 76px);
  right: 0;
  width: 76px;
  height: 152px;
  z-index: 1;
  & button {
    width: 100%;
    height: 76px;
    border: none;
    outline: none;
    background-color: #141619;
    color: #fff;
    font-size: 50px;
    font-weight: 100;
    &:last-child {
      margin-top: 1px;
    }
  }
`;

export default Controls;
