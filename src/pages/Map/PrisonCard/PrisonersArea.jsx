import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { select } from 'd3-selection';
import styled from 'styled-components';

import { splitDigits } from '../../../utils/utils';

const G = styled.g`
  pointer-events: auto;
  & rect {
    fill: #fff;
    opacity: .2;
  }
  & line {
    stroke-width: 2px;
  }
  & text {
    fill: #fff;
  }
  & g text {
    opacity: .2;
    transform: translate(10px, 18px);
  }
`;

class PrisonersArea extends PureComponent {
  componentDidMount() {
    const { data, xScale, yScale } = this.props;
    const prisonersArea = select(this.g);

    prisonersArea
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('y', (d) => {
        const date = new Date(d.year, 0, 1);
        return yScale(date) + 1;
      })
      .attr('width', d => xScale(d.prisoners))
      .attr('height', 25);

    prisonersArea
      .selectAll('line')
      .data(data)
      .enter()
      .append('line')
      .attr('fill', 'none')
      .attr('stroke', d => d.prisoners !== 0 ? '#fff' : 'transparent')
      .attr('x1', d => xScale(d.prisoners))
      .attr('y1', (d) => {
        const date = new Date(d.year, 0, 1);
        return yScale(date) + 1;
      })
      .attr('x2', d => xScale(d.prisoners))
      .attr('y2', (d) => {
        const date = new Date(d.year, 0, 1);
        return yScale(date) + 26;
      });

    prisonersArea
      .selectAll('text')
      .data(data)
      .enter()
      .append('text')
      .text(({ prisoners }) => prisoners !== 0 ? splitDigits(prisoners) : '')
      .attr('x', d => xScale(d.prisoners) + 10)
      .attr('y', (d) => {
        const date = new Date(d.year, 0, 1);
        return yScale(date) + 19;
      });

    prisonersArea
      .append('g')
      .selectAll('g')
      .data(data)
      .enter()
      .append('text')
      .text((d) => {
        if (d.prisoners === 0) {
          return 'нет данных';
        }
        return '';
      })
      .attr('y', (d) => {
        const date = new Date(d.year, 0, 1);
        return yScale(date) + 1;
      });
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
  )
};

export default PrisonersArea;
