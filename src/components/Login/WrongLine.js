import styled from 'styled-components';

export default styled.div`
  position: absolute;
  bottom: 5px;

  width: ${({ isPassWrong }) => (isPassWrong ? '100%' : '0')};
  height: 2px;

  background-color: #d0021b;

  transition: .3s;
`;
