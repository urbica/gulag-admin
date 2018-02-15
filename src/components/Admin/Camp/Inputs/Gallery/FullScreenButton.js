import styled from 'styled-components';

export default styled.button`
  position: absolute;
  top: 0;
  right: 0;

  display: none;
  width: 50px;
  height: 50px;
  padding: 0;
  border: none;
  margin: 0;
  outline: none;

  background-color: rgba(16, 20, 24, 0.5);
  
  &:hover {
    display: block;
    background-color: rgba(16, 20, 24, 0.7);
  }

  &:before,
  &:after {
    content: '';
    position: absolute;
    display: block;
    width: 10px;
    height: 10px;
  }
  
  &:before {
    top: 10px;
    right: 10px;
    border-top: 1px solid #fff;
    border-right: 1px solid #fff;
  }

  &:after {
    bottom: 10px;
    left: 10px;
    border-bottom: 1px solid #fff;
    border-left: 1px solid #fff;
  }
`;
