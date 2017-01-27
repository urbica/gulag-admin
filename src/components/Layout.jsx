import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 1064px;
  padding: 20px;
  margin: auto;
`;

const Block = styled.div`
  padding: 20px;
`;

export const One = styled(Block)`
  flex: 0 0 100%;
`;

export const Two = styled(Block)`
  flex: 0 0 50%;
`;