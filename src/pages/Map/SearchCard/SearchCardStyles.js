import styled from 'styled-components';
import ButtonTemplate from '../StyledButton';

export const Wrap = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  width: 430px;
  overflow: scroll;
  color: #fff;
  z-index: 2;
`;

export const Header = styled.header`
  display: flex;
  position: fixed;
  width: 430px;
  z-index: 1;
`;

export const Input = styled.input`
  width: 100%;
  padding: 15px;
  padding-right: 106px;
  border: solid 1px transparent;
  margin: 0;
  font-size: 16px;
  color: rgba(225, 225, 225, 0.5);
  background-color: #000;
  outline: none;
  &:focus {
    border-color: #9CA2A9;
  }
`;

export const Button = styled(ButtonTemplate)`
  position: absolute;
  right: 0;
  &:hover {
    background-color: rgba(66, 74, 84 ,0.3);
  }
  &:active {
    background-color: rgba(66, 74, 84 ,0.5);  
  }
  &:focus {
    border-color: #9CA2A9;
  }
`;

export const Item = styled.div`
  margin-bottom: 1px;
  background-color: #000;
  &:first-child {
    margin-top: 51px;
  }
  & a {
    display: block;
    padding: 15px 30px 20px;
    color: #fff;
    text-decoration: none;
  }
  &:hover {
    background-color: #1b2128;
  }
`;

export const Name = styled.div`
  margin-bottom: 10px;
`;

export const Periods = styled.div`
  opacity: 0.5;
  font-size: 16px;
`;
