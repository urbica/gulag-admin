import styled from 'styled-components';

export default styled.button`
  width: ${({ width }) => width};
  height: 40px;
  border: none;

  font-size: 12px;
  font-weight: bold;

  background-color: ${({ active }) => (active ? '#fff' : 'transparent')};
`;
