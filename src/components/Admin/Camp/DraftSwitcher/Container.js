import styled from 'styled-components';

export default styled.label`
  position: relative;

  padding: 5px;
  margin-right: 10px;

  background-color: #f3f3f3;

  overflow: hidden;
  cursor: pointer;

  & input {
    display: none;
  }

  & span {
    position: relative;

    display: inline-block;
    width: 125px;

    text-align: center;
    line-height: 40px;
    font-family: 'Formular';
    font-size: 12px;
    font-weight: bold;

    z-index: 1;
  }
`;
