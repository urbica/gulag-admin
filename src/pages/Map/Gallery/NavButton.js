import styled from 'styled-components';

export default styled.button`
  position: absolute;
  top: ${({ position }) => (position === 'left' ? 0 : '3vh')};
  bottom: 0;
  ${({ position }) => position}: 0;

  width: 3vh;
  padding: 0;
  border: none;

  background-color: transparent;

  transition: .4s;

  &:hover {
    background-color: rgba(255,255,255,0.2);
    transition: .4s;
  }
`;
