import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { select, event } from 'd3-selection';
import { drag } from 'd3-drag';
import styled from 'styled-components';

const G = styled.g`
  display: ${({ isVisible }) => isVisible ? 'block' : 'none'};
  &:hover {
    cursor: pointer;
  }
`;

class Slider extends PureComponent {
  componentDidMount() {
    const { xScale, setYear, width } = this.props;
    const slider = select(this.g);
    const barWidth = Math.round(width / 42) - 2;
    this.handle = slider
      .append('g')
      .attr('class', 'handle');

    this.currentYearRect = this.handle
      .append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', barWidth)
      .attr('height', 0)
      .attr('fill', '#fff')
      .attr('opacity', 0.5)
      .attr('class', 'currentYearRect');

    this.handle
      .append('rect')
      .attr('width', barWidth)
      .attr('height', 11)
      .attr('fill', '#1E2734')
      .attr('filter', 'url(#gaussianBlur)')
      .attr('transform', 'translate(1, -5)');

    this.handle
      .append('rect')
      .attr('width', barWidth)
      .attr('height', 11)
      .attr('fill', '#fff')
      .attr('transform', 'translate(1, -5)');

    this.handle
      .append('path')
      .attr('d', 'M15,3 L16,3 L16,9 L15,9 L15,3 Z M19,3 L20,3 L20,9 L19,9 L19,3 Z M23,3 L24,3 L24,9 L23,9 L23,3 Z')
      .attr('fill', '#22252F')
      .attr('opacity', '0.3')
      .attr('transform', 'translate(-8, -5.5)');

    slider
      .append('line')
      .attr('x1', xScale.range()[0])
      .attr('x2', xScale.range()[1])
      .attr('stroke-width', 30)
      // .attr('stroke', '#ffF')
      .attr('pointer-events', 'stroke')
      .call(
        drag()
          .on('start drag', () => setYear(xScale.invert(event.x).getFullYear()))
      );
  }

  componentWillReceiveProps(nextProps) {
    const { height, xScale, yScale, data } = this.props;
    const { currentYear } = nextProps;
    let prisoners = 0;

    data.map(d => d.year === currentYear ? prisoners = d.prisoners : 0);

    this.handle
      .attr('transform', `translate(${xScale(new Date(currentYear, 0, 1))}, 0)`);

    this.currentYearRect
      .attr('height', height - yScale(prisoners))
      .attr('transform', `translate(1, -${height - yScale(prisoners)})`);
  }

  render() {
    const { height, margin, isVisible } = this.props;

    return (
      <G
        innerRef={ref => (this.g = ref)}
        transform={`translate(${margin.left}, ${height + margin.top})`}
        isVisible={isVisible}
      />
    );
  }
}

Slider.propTypes = {
  xScale: PropTypes.func,
  yScale: PropTypes.func,
  setYear: PropTypes.func,
  width: PropTypes.number,
  height: PropTypes.number,
  margin: PropTypes.shape({
    top: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number
  }),
  data: PropTypes.arrayOf(
    PropTypes.shape({
      prisoners: PropTypes.number,
      year: PropTypes.number
    })
  ),
  currentYear: PropTypes.number,
  isVisible: PropTypes.bool
};

export default Slider;
