import styled from 'styled-components';

export default styled.label`
  position: relative;

  width: 100%;
  margin-bottom: 5px;

  & input {
    width: 100%;
    padding: 0 100px 0 0;
    border: none;
    border-bottom: 1px solid rgba(0,0,0,.2);

    font-family: 'Formular';
    font-size: 48px;
    font-weight: bold;

    outline: none;

    &::placeholder {
      color: #e5e5e5;
    }
  }
`;
