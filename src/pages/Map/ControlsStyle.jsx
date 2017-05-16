import styled from 'styled-components';

const Controls = styled.div`
  position: absolute;
  top: calc(${({ slideUp }) => slideUp ? '36%' : '50%'} - 76px);
  right: 0;
  width: 50px;
  height: 152px;
  z-index: 1;
  & button {
    display: block;
    margin-bottom: 1px;
  }
`;

export default Controls;
