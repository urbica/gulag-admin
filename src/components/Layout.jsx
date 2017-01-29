import React from 'react';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 1064px;
  padding: 20px;
  margin: auto;
`;

const justify = {
  center: 'center',
  end: 'flex-end'
};

const align = {
  center: 'center',
  end: 'flex-end'
};

const Block = styled.div`
  padding: 20px;
  ${props => props.align || props.justify ? 'display: flex;' : null}
  ${props => props.justify ? `justify-content: ${justify[props.justify]};` : null}
  ${props => props.align ? `align-items: ${align[props.align]};` : null}
`;

export const Six = styled(Block)`
  flex: 0 0 100%;
  max-width: 100%;
`;

export const Five = styled(Block)`
  flex: 0 0 calc(500% / 6);
  max-width: calc(500% / 6);
`;

export const Four = styled(Block)`
  flex: 0 0 calc(400% / 6);
  max-width: calc(400% / 6);
`;

export const Three = styled(Block)`
  flex: 0 0 50%;
  max-width: 50%;
`;

export const Two = styled(Block)`
  flex: 0 0 calc(200% / 6);
  max-width: calc(200% / 6);
`;

export const One = styled(Block)`
  flex: 0 0 calc(100% / 6);
  max-width: calc(100% / 6);
`;

Block.propTypes = {
  justify: React.PropTypes.oneOf(['center', 'end']),
  align: React.PropTypes.oneOf(['center', 'end'])
};