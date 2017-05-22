import React, { PureComponent } from 'react';
import { toPairs } from 'ramda';
import PropTypes from 'prop-types';
import { select } from 'd3-selection';
import { axisBottom } from 'd3-axis';

const axisStyle = {
  stroke: '#fff',
  strokeWidth: 1,
  opacity: 0.25
};

class Axis extends PureComponent {
  componentDidMount() {
    const { scale } = this.props;

    const axis = axisBottom(scale);
    axis
      .ticks(42)
      .tickFormat('');

    const el = select(this.axis);
    el.call(axis);

    const elPath = el.selectAll('path');
    const elLine = el.selectAll('line');

    toPairs(axisStyle).forEach(([key, value]) => {
      elPath.style(key, value);
      elLine.style(key, value);
    });
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
