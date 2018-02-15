import styled from 'styled-components';

export default styled.img`
  position: absolute;
  top: 50%;
  left: calc(100% + 10px);

  display: ${({ isLoading }) => (isLoading ? 'block' : 'none')};
  width: 25px;

  transform: translateY(-50%);
`;
