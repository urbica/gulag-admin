import styled from 'styled-components';

export const Wrap = styled.header`
  position: fixed;
  display: flex;
  align-items: center;
  width: 100%;
  background-color: rgba(0,0,0,.5);
  white-space: pre;
  color: #fff;
  z-index: 1;
  @media (max-width: 375px) {
    justify-content: space-between;
  }
`;

export const HeaderCenterGroup = styled.div`
  flex-grow: 1;
  display: flex;
  @media (max-width: 375px) {
    justify-content: flex-start;
  }
`;

export const Group = styled.div`
  display: flex;
  align-items: center;
  margin-left: 30px;
  & svg {
    margin-right: 5px;
    min-width: 22px;
  }
  & div {
    width: 100%;
  }
  @media (max-width: 1023px) {
    & svg {
      display: none;
    }
  }
  @media (max-width: 425px) {
    flex-basis: 33%;
    margin-left: 0;
    text-align: center;
  }
`;

export const Amount = styled.div`
  padding-top: 2px;
`;

export const Desc = styled.span`
  font-size: 12px;
  opacity: .5;
`;

export const SelectStyled = styled.div`
  margin-left: auto;
  @media (max-width: 375px) {
    display: none;
  }
`;
