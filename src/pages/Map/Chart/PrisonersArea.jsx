import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { select } from 'd3-selection';
import styled from 'styled-components';

const G = styled.g`
  pointer-events: auto;
  & g:last-child {
    & rect {
      fill: #fff;
      opacity: .1;
      transition: 2s;
      &:hover {
        cursor: pointer;
        opacity: .2;
        transition: .2s;
      }
    }
    & line {
      stroke: #fff;
      stroke-width: 2px;
    }
  }
  & g:first-child {
    & rect {
      fill: red;
      opacity: .1;
      transition: 2s;
      &:hover {
        cursor: pointer;
        opacity: .2;
        transition: .2s;
      }
    }
    & line {
      stroke: red;
      stroke-width: 2px;
    }
  }
`;

class PrisonersArea extends PureComponent {
  componentDidMount() {
    const { data, xScale, yScale, width, height, onClick } = this.props;
    const prisonersArea = select(this.g);
    const barWidth = Math.round(width / 42) - 2;

    const deadG = prisonersArea
      .append('g');

    const prisonersG = prisonersArea
      .append('g');

    prisonersG
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d) => {
        const date = new Date(d.year, 0, 1);
        return xScale(date) + 1;
      })
      .attr('y', d => yScale(d.prisoners))
      .attr('width', barWidth)
      .attr('height', d => height - yScale(d.prisoners))
      .on('click', d => onClick(d.year));

    prisonersG
      .selectAll('line')
      .data(data)
      .enter()
      .append('line')
      .attr('fill', 'none')
      .attr('x1', (d) => {
        const date = new Date(d.year, 0, 1);
        return xScale(date) + 1;
      })
      .attr('y1', d => yScale(d.prisoners))
      .attr('x2', (d) => {
        const date = new Date(d.year, 0, 1);
        return xScale(date) + barWidth + 1;
      })
      .attr('y2', d => yScale(d.prisoners));

    deadG
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d) => {
        const date = new Date(d.year, 0, 1);
        return xScale(date) + 1;
      })
      .attr('y', d => yScale(d.dead))
      .attr('width', barWidth)
      .attr('height', d => height - yScale(d.dead))
      .on('click', d => onClick(d.year));

    deadG
      .selectAll('line')
      .data(data)
      .enter()
      .append('line')
      .attr('fill', 'none')
      .attr('x1', (d) => {
        const date = new Date(d.year, 0, 1);
        return xScale(date) + 1;
      })
      .attr('y1', d => yScale(d.dead))
      .attr('x2', (d) => {
        const date = new Date(d.year, 0, 1);
        return xScale(date) + barWidth + 1;
      })
      .attr('y2', d => yScale(d.dead));
  }

  render() {
    const { margin } = this.props;

    return (
      <G
        innerRef={ref => (this.g = ref)}
        transform={`translate(${margin.left}, ${margin.top})`}
      />
    );
  }
}

PrisonersArea.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  margin: PropTypes.shape({
    top: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number
  }),
  xScale: PropTypes.func,
  yScale: PropTypes.func,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      prisoners: PropTypes.number,
      year: PropTypes.number
    })
  ),
  onClick: PropTypes.func
};

export default PrisonersArea;
