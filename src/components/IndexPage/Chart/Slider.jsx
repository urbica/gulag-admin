import React, { PureComponent } from 'react'
import { select, event } from 'd3-selection'
import { drag } from 'd3-drag'

class Slider extends PureComponent {
  componentDidMount() {
    const { xScale, setYear } = this.props;
    const slider = select(this.g);
    this.handle = slider.append('g');

    this.handleLine = this.handle
      .append('line')
      .attr('x1', 0)
      .attr('x2', 0)
      .attr('y1', 0)
      .attr('y2', 0)
      .attr('stroke-width', 1)
      .attr('stroke', '#fff');

    this.handle
      .append("circle")
      .attr("r", 9);

    slider
      .append("line")
      .attr("x1", xScale.range()[0])
      .attr("x2", xScale.range()[1])
      .attr('stroke-width', 50)
      .attr('pointer-events', 'stroke')
      .call(
        drag()
          .on("start drag", () => setYear(xScale.invert(event.x).getFullYear()))
      );
  }

  componentWillReceiveProps(nextProps) {
    const { height, xScale, yScale, data } = this.props;
    const { currentYear } = nextProps;
    let prisoners = 0;

    data.map(d => d.year === currentYear ? prisoners = d.prisoners : 0);

    this.handle
      .attr('transform', `translate(${xScale(new Date(currentYear, 6, 1))}, 0)`);

    this.handleLine
      .attr('y1', height - yScale(prisoners))
      .attr('transform', `translate(0, -${height - yScale(prisoners)})`);
  }

  render() {
    const { height, margin } = this.props;

    return (
      <g
        ref={ref => this.g = ref}
        transform={`translate(${margin.left}, ${height + margin.top})`}
      />
    )
  }
}

export default Slider