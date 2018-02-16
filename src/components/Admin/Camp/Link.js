import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default styled(Link)`
  margin-left: auto;
  margin-right: 20px;

  font-size: 12px;
  font-weight: bold;
  color: #000;
  text-decoration: none;

  transition: .2s;

  &:hover {
    opacity: .5;
    transition: .2s;
  }
`;
