/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import { scaleTime, scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import Axis from './Axis';
import PrisonersArea from './PrisonersArea';

const margin = {
  top: 5,
  right: 65,
  bottom: 5,
  left: 40
};
const width = 300 - margin.left - margin.right;

const PrisonChart = ({ features }) => {
  const data = features.reduce((acc, feature) => {
    Object.keys(feature.properties).forEach((key) => {
      acc.push({
        year: +key,
        prisoners: +feature.properties[key].peoples
      });
    });
    return acc;
  }, []);

  const firstYear = data[0].year;
  const lastYear = data[data.length - 1].year;

  const height = (((lastYear - firstYear) + 1) * 26);

  const yScale = scaleTime()
    .domain([new Date(firstYear, 0, 1), new Date(lastYear, 11, 31)])
    .range([0, height]);

  const xScale = scaleLinear()
    .domain([0, max(data, d => d.prisoners)])
    .range([0, width]);

  return (
    <svg
      width={width + margin.left + margin.right}
      height={height + margin.top + margin.bottom}
    >
      <Axis
        ticks={(lastYear - firstYear) + 1}
        scale={yScale}
        height={height}
        margin={margin}
      />
      <PrisonersArea
        data={data}
        width={width}
        height={height}
        margin={margin}
        xScale={xScale}
        yScale={yScale}
      />
    </svg>
  );
};

PrisonChart.propTypes = {
  features: PropTypes.arrayOf(
    PropTypes.object
  )
};

export default PrisonChart;
