import styled from 'styled-components';

export default styled.div`
  & figure {
    position: relative;
    display: inline-block;
    margin: 0 10px 0 0;

    vertical-align: top;
    cursor: pointer;

    & img {
      width: 150px;
      height: 100px;
    }

    & button {
      position: absolute;
      top: 0;
      right: 0;

      display: none;
      padding: 3px 10px;
      border: none;

      font-family: 'Formular';
      font-size: 14px;
      color: #fff;

      background-color: #000;
      opacity: .7;

      cursor: pointer;
    }

    &:hover button {
      display: block;
    }
  }
`;
