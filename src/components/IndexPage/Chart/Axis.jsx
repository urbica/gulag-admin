import React, { PropTypes, PureComponent } from 'react';
import { select } from 'd3-selection';
import { axisBottom } from 'd3-axis';

const tickValues = [1918, 1923, 1930, 1937, 1941, 1945, 1953, 1960];
const axisStyle = {
  stroke: '#fff',
  strokeWidth: 1,
  opacity: .25
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
    return (
      <g
        ref={(ref) => this.axis = ref}
        transform={`translate(${this.props.margin.left}, ${this.props.height})`}
      />
    );
  }
}

Axis.propTypes = {
  orientation: PropTypes.string.isRequired,
  scale: PropTypes.func.isRequired,
  transform: PropTypes.string,
  ticks: PropTypes.func,
  axisStyle: PropTypes.shape({
    fill: PropTypes.string,
    fillOpacity: PropTypes.string,
    stroke: PropTypes.string,
    strokeWidth: PropTypes.number,
    strokeOpacity: PropTypes.number,
    strokeLinecap: PropTypes.string,
    strokeLinejoin: PropTypes.string
  }),
  textStyle: PropTypes.shape({
    fill: PropTypes.string,
    fillOpacity: PropTypes.string,
    stroke: PropTypes.string,
    strokeWidth: PropTypes.number,
    strokeOpacity: PropTypes.number,
    strokeLinecap: PropTypes.string,
    strokeLinejoin: PropTypes.string
  })
};

Axis.defaultProps = {
  ticks: undefined,
  transform: undefined,
  axisStyle: {
    stroke: '#000'
  },
  textStyle: {
    fill: '#000'
  }
};

export default Axis;