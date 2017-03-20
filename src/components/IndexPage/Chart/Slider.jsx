import React from 'react'
import { select, event } from 'd3-selection'
import { drag } from 'd3-drag'
import styled from 'styled-components'

const G = styled.g`
  & line {
    pointer-events: stroke;
  }
`;

class Slider extends React.Component {
  componentDidMount() {
    const { xScale, yScale, data, height } = this.props;
    const slider = select(this.sliderGroup);

    const handle = slider.append('g');

    const handleLine = handle
      .append('line')
      .attr('x1', 0)
      .attr('x2', 0)
      .attr('y1', 0)
      .attr('y2', 0)
      .attr('stroke-width', 1)
      .attr('stroke', '#fff');

    handle
      .append("circle")
      .attr("r", 9);

    const dragged = (date) => {
      const year = date.getFullYear();
      let prisoners = 0;

      data.map(d => d.year === year ? prisoners = d.prisoners : 0);

      handle
        .attr('transform', `translate(${xScale(date)}, 0)`);

      handleLine
        .attr('y1', height - yScale(prisoners))
        .attr('transform', `translate(0, -${height - yScale(prisoners)})`);
    };

    slider
      .append("line")
      .attr("x1", xScale.range()[0])
      .attr("x2", xScale.range()[1])
      .attr('stroke-width', 50)
      .call(
        drag()
          .on("start drag", () => dragged(xScale.invert(event.x)))
      );
  }

  render() {
    return (
      <G
        innerRef={ref => this.sliderGroup = ref}
        transform={`translate(${this.props.margin.left}, ${this.props.height})`}
      />
    )
  }
}

export default Slider