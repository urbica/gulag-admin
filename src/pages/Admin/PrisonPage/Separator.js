import styled from 'styled-components';

const Separator = styled.fieldset`
  width: 100%;
  padding: 0;
  border-color: #000;
  border-left: none;
  border-right: none;
  border-bottom: none;
  opacity: 0.3;
  & legend {
    padding: 0 10px;
    margin: auto;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: bold;
  }
`;

export default Separator;
