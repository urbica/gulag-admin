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
`;

export const Input = styled.input`
  width: 100%;
  padding: 30px;
  padding-right: 106px;
  border: 0;
  margin: 0;
  font-size: 16px;
  color: rgba(225, 225, 225, 0.5);
  background-color: #000;
`;

export const Button = styled(ButtonTemplate)`
  position: absolute;
  right: 0;
`;

export const Item = styled.div`
  padding: 15px 30px 20px;
  margin-bottom: 1px;
  background-color: #000;
  &:first-child {
    margin-top: 80px;
  }
  & a {
    color: #fff;
    text-decoration: none;
  }
  &:hover {
    background-color: #1b2128;
  }
`;
