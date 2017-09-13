import styled from 'styled-components';

export default styled.button`
  position: absolute;
  top: 0;
  right: 0;

  display: none;
  width: 78px;
  height: 78px;
  padding: 0;
  border: none;
  margin: 0;

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
    width: 16px;
    height: 16px;
  }
  
  &:before {
    top: 20px;
    right: 20px;
    border-top: 1px solid #fff;
    border-right: 1px solid #fff;
  }

  &:after {
    bottom: 20px;
    left: 20px;
    border-bottom: 1px solid #fff;
    border-left: 1px solid #fff;
  }
`;
