import styled from 'styled-components';
import ButtonTemplate from '../StyledButton';

export const Wrap = styled.div`
  position: absolute;
  right: 0;
  width: 1000px;
  color: rgba(225, 225, 225, 0.8);
  z-index: 1;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  padding-left: 50px;
  margin-bottom: 1px;
  background-color: #000;
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

export const DescriptionContainer = styled.div`
  padding: 30px 100px 70px 50px;
  margin-bottom: 1px;
  background-color: #000;
`;

export const Footer = styled.footer`
  display: flex;
  align-items: center;
  padding: 50px;
  padding-top: 35px;
  padding-bottom: 31px;
  background-color: #000;
  & a:first-child {
    margin-right: 40px;
  }
  & > img {
    margin-right: 40px;
  }
`;
