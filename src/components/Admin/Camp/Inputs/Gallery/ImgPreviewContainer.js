import styled from 'styled-components';

export default styled.div`
  position: relative;
  display: inline-block;
  max-width: 90px;
  max-height: 45px;
  margin-right: 5px;

  &:hover:before {
    background-color: transparent;
  }

  &:before {
    content: '';
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;

    background-color: rgba(
      0,
      0,
      0,
      ${({ isActive }) => (isActive ? 'transparent' : '0.5')}
    );
  }

  img {
    max-width: 90px;
    max-height: 45px;
  }
`;
