import React from 'react'
import { scaleTime, scaleLinear } from 'd3-scale'
import { max } from 'd3-array'
import { isEmpty } from 'ramda'
import PrisonersArea from './PrisonersArea'
import Axis from './Axis'
import Slider from './Slider'
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
  const { data, periods, setYear, openPeriod } = props;

  const xScale = scaleTime()
    .domain([new Date(1918, 0, 1), new Date(1960, 11, 31)])
    .range([0, width - margin.left - margin.right])
    .clamp(true);

  const yScale = scaleLinear()
    .domain([0, max(data, d => d.prisoners)])
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
      {
        !isEmpty(periods) &&
        <Periods
          periods={periods}
          xScale={xScale}
          height={height}
          margin={margin}
          onClick={openPeriod}
        />
      }
      <Axis
        height={height - margin.top - margin.bottom}
        margin={margin}
        orientation="bottom"
        scale={xScale}
      />
      <Slider
        data={data}
        xScale={xScale}
        yScale={yScale}
        height={height - margin.top - margin.bottom}
        margin={margin}
      />
    </svg>
  )
};

export default Chart