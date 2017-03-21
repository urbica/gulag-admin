import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { select } from 'd3-selection'

const G = styled.g`
  pointer-events: auto;
  font-size: 11px;
  & text {
    fill: #fff;
  }
`;

class Periods extends PureComponent {
  componentDidMount() {
    const { xScale, margin, onClick } = this.props;
    const periods = Object.values(this.props.periods);
    const periodsArea = select(this.periodsArea);

    periodsArea
      .selectAll('rect')
      .data(periods)
      .enter()
      .append('rect')
      .attr("y", 0)
      .attr("x", d => {
        const date = new Date(d.year_start, 0, 1);
        return xScale(date)
      })
      .attr("width", d => {
        const dateStart = new Date(d.year_start, 0, 1);
        const dateEnd = new Date(d.year_end, 0, 1);
        return xScale(dateEnd) - xScale(dateStart)
      })
      .attr("height", margin.bottom)
      .attr('style', (d, i) => {
        return `
          fill: ${(i % 2) ? '#fff' : '#000'};
          opacity: .1;
        `
      })
      .on('click', d => onClick(d.id));

    periodsArea
      .selectAll('text')
      .data(periods)
      .enter()
      .append("text")
      .text(d => d.name.ru)
      .attr("dx", ".5em")
      .attr("x", d => {
        const date = new Date(d.year_start, 0, 1);
        return xScale(date)
      })
      .attr("y", '41');
  }

  render() {
    const { height, margin } = this.props;

    return (
      <G
        innerRef={ref => this.periodsArea = ref}
        transform={`translate(${margin.left}, ${margin.top + height})`}
      />
    )
  }
}

export default Periods