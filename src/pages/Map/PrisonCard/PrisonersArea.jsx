import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { select } from 'd3-selection';
import styled from 'styled-components';

const G = styled.g`
  pointer-events: auto;
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
