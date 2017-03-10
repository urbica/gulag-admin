import React from 'react'
import { scaleTime, scaleLinear } from 'd3-scale'
import PrisonersArea from './PrisonersArea'
import Axis from './Axis'
import Periods from './Periods'

const width = 1200;
const height = 350;
const margin = {
  top: 25,
  right: 180,
  bottom: 80,
  left: 180
};

const Chart = (props) => {
  const { data, setYear } = props;

  const xScale = scaleTime()
    .domain([new Date(1918, 0, 1), new Date(1960, 11, 31)])
    .range([0, width - margin.left - margin.right]);

  const yScale = scaleLinear()
    .range([height - margin.top - margin.bottom, 0]);

  return (
    <svg
      height={height}
      width={width}
    >
      <PrisonersArea
        data={data}
        xScale={xScale}
        yScale={yScale}
        width={width - margin.left - margin.right}
        height={height - margin.top - margin.bottom}
        margin={margin}
        onClick={setYear}
      />
      <Axis
        height={height - margin.top - margin.bottom}
        margin={margin}
        orientation="bottom"
        scale={xScale}
      />
      <Periods/>
    </svg>
  )
};

export default Chart