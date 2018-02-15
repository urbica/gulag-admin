import styled from 'styled-components';

export default styled.div`
  position: relative;
  width: 100%;
  max-height: 225px;
  margin-bottom: 5px;

  text-align: center;

  img {
    max-width: 100%;
    max-height: 225px;

    &:hover + button {
      display: inline-block;
    }
  }
`;
