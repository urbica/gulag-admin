import styled from 'styled-components';
import { CardButton } from '../StyledButtons';

export const Wrap = styled.div`
  position: absolute;
  top: 30%;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  width: 100%;
  min-height: 70%;
  padding: 40px 100px 80px 40px;
  background-color: #000;
  color: #fff;
  font-size: 14px;
  font-family: 'Formular', sans-serif;
  overflow: scroll;
  transition: .4s;
  z-index: 1;
  @media (max-width: 425px) {
    padding: 15px;
    &:before {
      content: '';
      width: 36px;
      height: 5px;
      margin: -9px auto 10px;
      opacity: 0.2;
      border-radius: 5px;
      background-color: #cfd0d0;
    }
  }
`;

export const Preloader = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const Top = styled.div`
  flex-basis: 100%;
  padding-bottom: 40px;
  font-family: Formular;
  & h1 {
    margin: 0 0 5px 0;
    color: #fff;
    @media (max-width: 425px) {
      padding-right: 40px;
    }
  }
  @media (max-width: 425px) {
    padding-bottom: 30px;
  }
`;

export const Location = styled.div`
  margin: 0;
  opacity: 0.8;
  font-size: 16px;
`;

export const Button = styled(CardButton)`
  position: absolute;
  top: 0;
  right: 0;
`;

export const Left = styled.div`
  flex: 1 1 450px;
  padding-right: 60px;
  column-gap: 60px;
  columns: 450px;
  & > div:nth-child(2) {
    padding-right: 0;
    padding-left: 20px;
  }
  @media (max-width: 425px) {
    padding-right: 0;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
  }
`;

export const HalfWidth = styled.div`
  display: inline-block;
  width: 50%;
  padding-right: 20px;
  vertical-align: top;
  & div {
    opacity: 0.8;
    font-size: 16px;
    color: #fff;
  }
`;

export const Subtitle = styled.h2`
  margin: 0 0 5px 0;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  & + div {
    margin-bottom: 40px;
    @media (max-width: 425px) {
       margin-bottom: 30px;
    }
  }
`;

export const MarkdownStyled = styled.div`
  h2 {
    margin-top: 0;
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: bold;
    color: #fff;
  }
  
  p {
    margin-bottom: 40px;
    font-size: 16px;
    color: #fff;
  }
  
  a {
    display: inline-block;
    padding-bottom: 2px;
    border-bottom: 4px solid #fff;
    margin-bottom: 10px;
    font-size: 16px;
    color: #fff;
    text-decoration: none;
    transition: 0.4s;
    &:hover {
      border-bottom: 4px solid transparent;
      transition: 0.4s;
    }
  }
  
  img {
    max-width: 100%;
  }
`;

export const Right = styled.div`
  flex-basis: 450px;
  @media (max-width: 449px) {
    flex-basis: 320px;
  }
`;
