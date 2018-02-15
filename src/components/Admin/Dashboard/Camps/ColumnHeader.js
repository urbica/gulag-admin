import styled from 'styled-components';

const triangle = {
  width: {
    ASC: '0 6px 10px 6px',
    DESC: '10px 6px 0 6px'
  },
  color: {
    ASC: 'transparent transparent #000 transparent',
    DESC: '#000 transparent transparent transparent'
  }
};

export default styled.td`
  border-top: none;
  text-transform: uppercase;
  font-size: 14px;
  white-space: nowrap;
  padding: 0 40px 10px 0;
  cursor: pointer;
  opacity: 1;
  transition: .2s;

  &:hover {
    opacity: .5;
    transition: .2s;
  }
  
  &:after {
    content: '';
    position: absolute;
    
    display: ${({ isTriangleVisible }) => (isTriangleVisible ? 'inline-block' : 'none')};
    width: 0;
    height: 0;
    border-style: solid;
    border-width: ${({ campsSortASC }) => (campsSortASC ? triangle.width.ASC : triangle.width.DESC)};
    border-color: ${({ campsSortASC }) => (campsSortASC ? triangle.color.ASC : triangle.color.DESC)};
    margin-top: 2px;
    margin-left: 5px;
`;
