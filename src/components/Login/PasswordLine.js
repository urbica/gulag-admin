import styled from 'styled-components';

export default styled.div`
  position: absolute;
  bottom: 0;

  width: 0;
  height: 2px;

  background-color: #000;

  transition: width .3s;

  input:focus ~ & {
    width: 100%;

    transition: width .3s;
  }
`;
