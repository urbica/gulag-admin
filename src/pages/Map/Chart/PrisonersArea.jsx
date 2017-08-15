/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { select } from 'd3-selection';
import styled from 'styled-components';

const G = styled.g`
  pointer-events: auto;
  & g:first-child {
    & rect {
      fill: #eb4200;
      opacity: .1;
      transition: opacity 2s;
      &:hover {
        cursor: pointer;
        opacity: .2;
        transition: opacity .2s;
      }
    }
    & line {
      stroke: #ff2b00;
      stroke-width: 2px;
    }
  }

  & g:nth-child(2) {
    & rect {
      cursor: pointer;
      fill-opacity: 0.1;
    }
  }

  & g:last-child {
    & rect {
      fill: #fff;
      opacity: ${({ showAllYears }) => (showAllYears ? 0.6 : 0.1)};
      transition: opacity 2s;
      &:hover {
        cursor: pointer;
        opacity: .2;
        transition: opacity .2s;
      }
    }
    & line {
      stroke: #fff;
      stroke-width: 2px;
    }
  }
  @media (max-width: 1023px) {
    display: none;
  }
`;

class PrisonersArea extends PureComponent {
  componentDidMount() {
    const { data } = this.props;

    const prisonersArea = select(this.g);
    const deadG = prisonersArea
      .append('g');

    const noDataG = prisonersArea
      .append('g');

    const prisonersG = prisonersArea
      .append('g');

    // dead group
    this.deadRect = deadG
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect');

    this.deadLine = deadG
      .selectAll('line')
      .data(data)
      .enter()
      .append('line');

    // no data group
    this.noDataRect = noDataG
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect');

    // prisoners group
    this.prisonersRect = prisonersG
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect');

    this.prisonersLine = prisonersG
      .selectAll('line')
      .data(data)
      .enter()
      .append('line');
  }

  componentWillReceiveProps(nextProps) {
    const { xScale, yScale, width, height, onClick } = nextProps;
    const barWidth = Math.round(width / 42) - 2;

    this.deadRect
      .attr('x', (d) => {
        const date = new Date(d.year, 0, 1);
        return xScale(date) + 1;
      })
      .attr('y', d => yScale(d.dead))
      .attr('width', barWidth)
      .attr('height', d => height - yScale(d.dead));

    this.deadLine
      .attr('fill', 'none')
      .attr('x1', (d) => {
        const date = new Date(d.year, 0, 1);
        return xScale(date) + 1;
      })
      .attr('y1', d => yScale(d.dead))
      .attr('x2', (d) => {
        const date = new Date(d.year, 0, 1);

        if (d.dead === 0) {
          return xScale(date) + 1;
        }
        return xScale(date) + barWidth + 1;
      })
      .attr('y2', d => yScale(d.dead));

    this.noDataRect
      .attr('x', (d) => {
        const date = new Date(d.year, 0, 1);
        return xScale(date) + 1;
      })
      // .attr('y', 0)
      .attr('y', yScale(250000))
      .attr('width', (d) => {
        if (d.prisoners === 0) {
          return barWidth;
        }
        return 0;
      })
      // .attr('height', height)
      .attr('height', height - yScale(250000))
      .attr('fill', 'url(#Gradient)')
      .on('click', d => onClick(d.year));

    this.prisonersRect
      .attr('x', (d) => {
        const date = new Date(d.year, 0, 1);
        return xScale(date) + 1;
      })
      .attr('y', d => yScale(d.prisoners))
      .attr('width', barWidth)
      .attr('height', d => height - yScale(d.prisoners))
      .on('click', d => onClick(d.year));

    this.prisonersLine
      .attr('fill', 'none')
      .attr('x1', (d) => {
        const date = new Date(d.year, 0, 1);
        return xScale(date) + 1;
      })
      .attr('y1', d => yScale(d.prisoners))
      .attr('x2', (d) => {
        const date = new Date(d.year, 0, 1);

        if (d.prisoners === 0) {
          return xScale(date) + 1;
        }
        return xScale(date) + barWidth + 1;
      })
      .attr('y2', d => yScale(d.prisoners));
  }

  render() {
    const { margin } = this.props;

    return (
      <G
        innerRef={(ref) => {
          this.g = ref;
        }}
        transform={`translate(${margin.left}, ${margin.top})`}
        showAllYears={this.props.showAllYears}
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
      dead: PropTypes.number,
      year: PropTypes.number
    })
  ),
  onClick: PropTypes.func
};

export default PrisonersArea;
