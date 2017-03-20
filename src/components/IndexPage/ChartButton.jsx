import React from 'react'
import styled from 'styled-components'

const Wrap = styled.button`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  pointer-events: auto;
`;

const ChartButton = (props) => {
  return (
    <Wrap onClick={props.onClick}/>
  )
};

export default ChartButton