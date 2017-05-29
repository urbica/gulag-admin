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
  padding-top: 78px;
  padding-left: 60px;
  padding-right: 100px;
  background-color: #0c0e12;
  color: #fff;
  font-size: 14px;
  font-family: 'PT Sans', sans-serif;
  overflow: scroll;
  transition: .4s;
  z-index: 1;
  @media (max-width: 425px) {
    padding: 15px;
  }
`;

export const Top = styled.div`
  flex-basis: 100%;
  padding-bottom: 60px;
  font-family: PT Sans;
  & h1 {
    margin: 0 0 5px 0;
    color: rgba(255, 255, 255, 0.8);
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
  opacity: 0.5;
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
  padding-bottom: 40px;
  column-gap: 60px;
  columns: 450px;
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
  opacity: 0.8;
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
    opacity: 0.8;
    font-size: 20px;
    font-weight: bold;
    color: #fff;
  }
  
  p {
    margin-bottom: 40px;
    opacity: 0.8;
    font-size: 16px;
    color: #fff;
  }
  
  a {
    font-size: 16px;
    color: #9da9c1;
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
