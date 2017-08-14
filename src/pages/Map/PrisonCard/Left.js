import styled from 'styled-components';

export default styled.div`
  flex: 1 1 450px;
  padding-right: 60px;
  column-gap: 60px;
  columns: 450px;
  & > div:nth-child(2) {
    padding-right: 0;
    padding-left: 20px;
  }
  @media (max-width: 425px) {
    padding-right: 0;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
  }
`;
