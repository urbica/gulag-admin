import styled from 'styled-components';

export default styled.div`
  position: absolute;
  top: 5px;
  bottom: 5px;
  left: ${props => (!props.checked ? '5px' : '50%')};

  width: calc(50% - 5px);

  background-color: #fff;

  transition: 0.3s ease-in 0s;

  z-index: 0;
`;
