import styled from 'styled-components';

export const Wrap = styled.div`
  position: ${({ visible }) => visible ? 'absolute' : 'fixed'};
  top: ${({ visible }) => visible ? '30%' : '100%'};
  display: flex;
  width: 100%;
  min-height: 70%;
  padding: 40px 80px 40px 50px;
  background-color: #222;
  color: #fff;
  font-size: 14px;
  font-family: 'PT Sans', sans-serif;
  overflow: scroll;
  transition: .4s;
  z-index: 1;
`;

export const Left = styled.div`
  flex: 1 1 auto;
`;
export const Right = styled.div`
  flex: 0 0 500px;
`;
