import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { select } from 'd3-selection';
import { axisBottom } from 'd3-axis';

const tickValues = [1918, 1923, 1930, 1937, 1941, 1945, 1953, 1960];
const axisStyle = {
  stroke: '#fff',
  strokeWidth: 1,
  opacity: 0.25
};
const textStyle = {
  fill: '#fff'
};

class Axis extends PureComponent {
  componentDidMount() {
    const { scale } = this.props;

    const axis = axisBottom(scale);
    axis
      .ticks(42)
      .tickFormat((d) => {
        const year = d.getFullYear();
        return (tickValues.indexOf(year) !== -1) ? year : '';
      });

    const el = select(this.axis);
    el.call(axis);

    const elPath = el.selectAll('path');
    const elLine = el.selectAll('line');

    Object.entries(axisStyle).forEach(([key, value]) => {
      elPath.style(key, value);
      elLine.style(key, value);
    });

    const elText = el.selectAll('text');
    Object.entries(textStyle).forEach(([key, value]) => elText.style(key, value));
  }

  render() {
    const { height, margin } = this.props;

    return (
      <g
        ref={ref => (this.axis = ref)}
        transform={`translate(${margin.left}, ${height + margin.top})`}
      />
    );
  }
}

Axis.propTypes = {
  scale: PropTypes.func.isRequired,
  height: PropTypes.number,
  margin: PropTypes.shape({
    top: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number
  })
};

export default Axis;
