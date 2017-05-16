import React from 'react';
import PropTypes from 'prop-types';
import { scaleTime, scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { isEmpty } from 'ramda';
import PrisonersArea from './PrisonersArea';
import Axis from './Axis';
import Slider from './Slider';
import Periods from './Periods';
import data from '../../../utils/prisonersAmountByYears';

const margin = {
  top: 5,
  right: 20,
  bottom: 80,
  left: 20
};
const width = 1000 - margin.left - margin.right;
const height = 300 - margin.top - margin.bottom;

const Chart = (props) => {
  const { periods, currentYear, setYear, openPeriod } = props;

  const xScale = scaleTime()
    .domain([new Date(1918, 0, 1), new Date(1960, 11, 31)])
    .range([0, width])
    .clamp(true);

  const yScale = scaleLinear()
    .domain([0, max(data, d => d.prisoners)])
    .range([height, 0]);

  return (
    <svg
      width={width + margin.left + margin.right}
      height={height + margin.top + margin.bottom}
    >
      <defs>
        <linearGradient
          id='Gradient'
          x1='0%'
          y1='31%'
          x2='10%'
          y2='0%'
          spreadMethod='repeat'
        >
          <stop offset='0%' stopColor='rgb(225,225,225)' />
          <stop offset='12%' stopColor='rgb(225,225,225)' />
          <stop offset='13%' stopColor='rgb(0,0,0)' />
          <stop offset='25%' stopColor='rgb(0,0,0)' />
          <stop offset='26%' stopColor='rgb(225,225,225)' />
          <stop offset='38%' stopColor='rgb(225,225,225)' />
          <stop offset='39%' stopColor='rgb(0,0,0)' />
          <stop offset='51%' stopColor='rgb(0,0,0)' />
          <stop offset='52%' stopColor='rgb(225,225,225)' />
          <stop offset='64%' stopColor='rgb(225,225,225)' />
          <stop offset='65%' stopColor='rgb(0,0,0)' />
          <stop offset='77%' stopColor='rgb(0,0,0)' />
          <stop offset='78%' stopColor='rgb(225,225,225)' />
          <stop offset='90%' stopColor='rgb(225,225,225)' />
          <stop offset='91%' stopColor='rgb(0,0,0)' />
          <stop offset='100%' stopColor='rgb(0,0,0)' />
        </linearGradient>
      </defs>
      <PrisonersArea
        width={width}
        height={height}
        margin={margin}
        xScale={xScale}
        yScale={yScale}
        data={data}
        onClick={setYear}
      />
      {
        !isEmpty(periods) &&
        <Periods
          height={height}
          margin={margin}
          xScale={xScale}
          periods={periods}
          onClick={openPeriod}
        />
      }
      <Axis
        height={height}
        margin={margin}
        scale={xScale}
      />
      <Slider
        width={width}
        height={height}
        margin={margin}
        xScale={xScale}
        yScale={yScale}
        data={data}
        currentYear={currentYear}
        setYear={setYear}
        isVisible={currentYear !== 'all'}
      />
    </svg>
  );
};

Chart.propTypes = {
  periods: PropTypes.object,
  currentYear: PropTypes.number,
  setYear: PropTypes.func,
  openPeriod: PropTypes.func
};

export default Chart;
