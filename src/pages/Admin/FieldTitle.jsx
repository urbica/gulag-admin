import PropTypes from 'prop-types';
import styled from 'styled-components';

const color = {
  blue: '#3949ab'
};

const FieldTitle = styled.div`
  width: 100%;
  padding: 6px 0;
  border-bottom: 1px solid rgba(0, 0, 0, .3);
  margin-bottom: 10px;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 12px;
  color: ${props => color[props.color] || '#000'};
`;

FieldTitle.propTypes = {
  color: PropTypes.oneOf(['blue'])
};

export default FieldTitle;
