import styled from 'styled-components';

export default styled.label`
  position: relative;
  width: 100%;
  cursor: text;
  & img {
    position: absolute;
    bottom: 15px;
    left: 12px;
  }
  & label input {
    text-indent: 30px;
  }
`;
