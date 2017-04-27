import styled from 'styled-components';

export const Wrap = styled.div`
  display: ${({ visible }) => visible ? 'block' : 'none'};
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

export const CloseButton = styled.button`
  padding: 23px;
  border: none;
  margin: 0;
  background-color: transparent;
  &:hover {
    background-color: #101418;
  }
`;

export const DescriptionContainer = styled.div`
  padding: 30px 100px 70px 50px;
  margin-bottom: 1px;
  background-color: #000;
`;

export const Footer = styled.footer`
  padding: 30px 100px 70px 50px;
  background-color: #000;
  & div {
    margin-bottom: 15px;
    opacity: 0.5;
  }
`;
