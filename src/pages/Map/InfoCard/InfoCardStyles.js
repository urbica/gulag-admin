import styled from 'styled-components';

export const Wrap = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  width: 600px;
  color: rgba(225, 225, 225, 0.8);
  z-index: 1;
`;

export const Header = styled.header`
  display: flex;
  flex-shrink: 0;
  padding-top: 40px;
  padding-left: 40px;
  padding-bottom: 14px;
  background-color: #000;
  & h1 {
    margin: 0;
  }
`;

export const DescriptionContainer = styled.div`
  padding: 0 60px 70px 40px;
  border-bottom: 1px solid #424a54;
  background-color: #000;
  flex-grow: 1;
`;

export const Footer = styled.footer`
  display: flex;
  padding: 20px 40px;
  background-color: #000;
  & a:first-child {
    margin-right: 40px;
  }
  & > img {
    margin-right: 40px;
  }
`;
