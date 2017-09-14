import styled from 'styled-components';

const AbstractButton = styled.button`
  width: 50px;
  height: 50px;
  padding: 0;
  border-style: solid;
  border-width: 1px;
  border-color: transparent;
  margin: 0;
  background-color: transparent;
  outline: none;
  & img {
    width: 100%;
    opacity: .6;
  }
  &:hover img {
    opacity: .8;
  }
`;

export const MapButton = styled(AbstractButton)`
  pointer-events: auto;
  background-color: rgba(0,0,0,.5);
  &:hover {
    background-color: rgba(0,0,0,.7);
  }
  &:active {
    background-color: rgb(0,0,0);
  }
`;

export const ChartButton = styled(MapButton)`
  margin-top: 157px;
`;

export const HeaderButton = styled(AbstractButton)`
  flex-shrink: 0;
  &:hover {
    background-color: rgba(0,0,0,.2);
  }
  &:active {
    background-color: rgb(0,0,0);
  }
`;

export const CardButton = styled(AbstractButton)`
  position: absolute;
  top: 0;
  right: 0;
  &:hover {
    background-color: rgba(93,106,119,.1);
  }
  &:active {
    background-color: rgba(93,106,119,.2);
  }
`;

export const CloseGalleryButton = styled(AbstractButton)`
  position: absolute;

  &:hover {
    background-color: rgba(93,106,119,.1);
  }
  &:active {
    background-color: rgba(93,106,119,.2);
  }
`;
