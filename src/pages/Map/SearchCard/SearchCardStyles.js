import styled from 'styled-components';

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
  padding-left: 30px;
  border: solid 1px transparent;
  margin: 0;
  font-size: 16px;
  color: rgba(225, 225, 225, 0.5);
  background-color: #000;
  outline: none;
`;

export const Item = styled.div`
  border-bottom: 1px solid rgba(46,55,67,.3);
  background-color: #000;
  &:first-child {
    border-top: 1px solid rgba(46,55,67,.3)
    margin-top: 50px;
  }
  & a {
    display: block;
    padding: 15px 30px 20px;
    color: rgba(255,255,255,.8);
    text-decoration: none;
  }
  &:hover {
    background-color: #090b0c;
  }
`;

export const Name = styled.div`
  margin-bottom: 10px;
`;

export const Periods = styled.div`
  opacity: 0.5;
  font-size: 16px;
`;
