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

export const Six = styled(Block)`
  flex: 0 0 100%;
`;

export const Four = styled(Block)`
  flex: 0 0 calc(400% / 6);
`;

export const Three = styled(Block)`
  flex: 0 0 50%;
`;

export const Two = styled(Block)`
  flex: 0 0 calc(200% / 6);
`;

export const One = styled(Block)`
  flex: 0 0 calc(100% / 6);
`;