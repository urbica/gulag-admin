import React from 'react'
import { select } from 'd3-selection'
import styled from 'styled-components'

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

class PrisonersArea extends React.PureComponent {
  componentDidMount() {
    const { data, xScale, yScale, height, onClick } = this.props;
    const prisonersArea = select(this.area);

    prisonersArea
      .selectAll('rect')
      .data(data)
      .enter()
      .append("rect")
      .attr("x", d => {
        const date = new Date(d.year, 0, 1);
        return xScale(date);
      })
      .attr('y', d => yScale(d.prisoners))
      .attr("width", this.props.width / 42 - 1)
      .attr('height', d => height - yScale(d.prisoners))
      .attr('transform', 'translate(1, 0)')
      .on('click', onClick.bind(null));

    prisonersArea
      .selectAll('line')
      .data(data)
      .enter()
      .append("line")
      .attr("fill", "none")
      .attr("x1", d => {
        const date = new Date(d.year, 0, 1);
        return xScale(date) + 1;
      })
      .attr("y1", d => yScale(d.prisoners))
      .attr("x2", d => {
        const date = new Date(d.year, 0, 1);
        return xScale(date) + (this.props.width / 42);
      })
      .attr("y2", d => yScale(d.prisoners));
  }

  render() {
    return (
      <G
        innerRef={ref => this.area = ref}
        transform={`translate(${this.props.margin.right}, 1)`}
      />
    )
  }
}

export default PrisonersArea