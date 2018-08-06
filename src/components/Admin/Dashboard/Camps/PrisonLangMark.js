import styled from 'styled-components';

export default styled.td`
  padding: 10px 25px 10px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.3);
  &:before {
    content: '';
    display: block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: ${props => (props.published ? '#000' : 'rgba(0,0,0,.1)')};
  }
`;
