import styled from 'styled-components';
import ButtonTemplate from '../StyledButton';

export const Wrap = styled.div`
  position: absolute;
  top: ${({ visible }) => visible ? '30%' : '100%'};
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  width: 100%;
  min-height: 70%;
  padding-top: 78px;
  padding-left: 60px;
  background-color: #0c0e12;
  color: #fff;
  font-size: 14px;
  font-family: 'PT Sans', sans-serif;
  overflow: scroll;
  transition: .4s;
  z-index: 1;
`;

export const Top = styled.div`
  flex-basis: 100%;
  padding-bottom: 60px;
  font-family: PT Sans;
  & h1 {
    margin: 0 0 5px 0;
    font-size: 48px;
    font-weight: bold;
  }
`;

export const Location = styled.div`
  margin: 0;
  opacity: 0.5;
  font-size: 16px;
`;

export const Button = styled(ButtonTemplate)`
  position: absolute;
  top: 0;
  right: 0;
`;

export const Left = styled.div`
  flex: 1 1;
  padding-right: 47px;
`;

export const HalfWidth = styled.div`
  display: inline-block;
  width: 50%;
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
  }
`;

export const MarkdownStyled = styled.div`
  h2 {
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
`;

export const Right = styled.div`
  flex-basis: 500px;
`;
