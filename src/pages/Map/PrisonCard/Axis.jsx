import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { select } from 'd3-selection';
import { axisLeft } from 'd3-axis';

const axisStyle = {
  stroke: '#fff',
  strokeWidth: 1,
  opacity: 0.25
};
const textStyle = {
  fill: '#fff',
  transform: 'translateY(50%)'
};

class Axis extends PureComponent {
  componentDidMount() {
    const { scale, ticks } = this.props;

    const axis = axisLeft(scale);
    axis.ticks(ticks);

    const el = select(this.axis);
    el.call(axis)
      .selectAll('text')
      .attr('y', 14);

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
    const { margin } = this.props;

    return (
      <g
        ref={ref => (this.axis = ref)}
        transform={`translate(${margin.left}, ${margin.top})`}
      />
    );
  }
}

Axis.propTypes = {
  scale: PropTypes.func.isRequired,
  margin: PropTypes.shape({
    top: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number
  })
};

export default Axis;
