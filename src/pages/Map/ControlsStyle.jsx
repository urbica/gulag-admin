import styled from 'styled-components';

const Controls = styled.div`
  position: absolute;
  top: calc(${({ slideUp }) => slideUp ? '36%' : '50%'} - 76px);
  right: 0;
  width: 76px;
  height: 152px;
  z-index: 1;
`;

export default Controls;
