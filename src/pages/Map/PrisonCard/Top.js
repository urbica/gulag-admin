import styled from 'styled-components';

export default styled.div`
  flex-basis: 100%;
  padding-bottom: 40px;
  font-family: Formular;
  & h1 {
    margin: 0 0 5px 0;
    color: #fff;
    @media (max-width: 425px) {
      padding-right: 40px;
    }
  }
  @media (max-width: 425px) {
    padding-bottom: 30px;
  }
`;
