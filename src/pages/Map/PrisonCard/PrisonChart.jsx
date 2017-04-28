import React from 'react';
import PropTypes from 'prop-types';
import { scaleTime, scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import Axis from './Axis';
import PrisonersArea from './PrisonersArea';

const margin = {
  top: 5,
  right: 35,
  bottom: 5,
  left: 35
};
const width = 600 - margin.left - margin.right;

const PrisonChart = ({ features }) => {
  // const newData = features.reduce();

  console.log(features);
  // [
  //   {
  //     type: 'Feature',
  //     geometry: { type: 'Point', coordinates: ['76.45670', '52.345670'] },
  //     properties: {
  //       1918: { peoples: 999999 }
  //     }
  //   },
  //   {
  //     type: 'Feature',
  //     geometry: { type: 'Point', coordinates: ['90', '56'] },
  //     properties: {
  //       1919: { peoples: 0 },
  //       1920: { peoples: 0 },
  //       1921: { peoples: 0 }
  //     }
  //   },
  //   {
  //     type: 'Feature',
  //     geometry: { type: 'Point', coordinates: [90, 62] },
  //     properties: {
  //       1922: { peoples: 123 },
  //       1923: { peoples: 456 }
  //     }
  //   }
  // ];

  // features.map(f => console.log(f.properties));
  // Object.keys(data).map(key => data[key] = data[key].peoples);
  //
  // const firstYear = Object.keys(data)[0];
  // const lastYear = Object.keys(data)[Object.keys(data).length - 1];

  const data = [
    {
      year: 1918,
      prisoners: 99
    },
    {
      year: 1919,
      prisoners: 457
    },
    {
      year: 1920,
      prisoners: 790
    },
    {
      year: 1921,
      prisoners: 293
    },
    {
      year: 1922,
      prisoners: 123
    },
    {
      year: 1924,
      prisoners: 456
    }
  ];
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
        ticks={lastYear - firstYear}
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
