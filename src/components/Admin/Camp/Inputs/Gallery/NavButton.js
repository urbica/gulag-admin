import styled from 'styled-components';

export default styled.button`
  position: absolute;
  top: ${({ position }) => (position === 'left' ? 0 : '50px')};
  bottom: 0;
  ${({ position }) => position}: 0;

  width: 50px;
  padding: 0;
  border: none;

  background-color: transparent;

  transition: .4s;

  &:hover {
    background-color: rgba(255,255,255,0.2);
    transition: .4s;
  }

  &:before {
    content: '';

    position: absolute;
    left: 50%;

    transform: translateX(-50%) rotate(45deg);
    display: block;
    width: 10px;
    height: 10px;
    border-${({ position }) =>
      position === 'left' ? 'left' : 'right'}: 2px solid rgba(255,255,255,0.5);
    border-${({ position }) =>
      position === 'left' ? 'bottom' : 'top'}: 2px solid rgba(255,255,255,0.5);
  }
`;
