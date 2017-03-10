import React from 'react'
import { select } from 'd3-selection'
import { max } from 'd3-array'

const barStyle = {
  fill: '#fff',
  opacity: '.25'
};

const lineStyle = {
  stroke: '#fff',
  strokeWidth: '2px'
};

class PrisonersArea extends React.PureComponent {
  componentDidMount() {
    const { data, xScale, yScale, height } = this.props;
    const prisonersArea = select(this.area);

    yScale.domain([0, max(data, d => d.prisoners)]);

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
      .on('click', this.props.onClick.bind(null));

    const bar = prisonersArea.selectAll('rect');
    Object.entries(barStyle).forEach(([key, value]) => {
      bar.style(key, value);
    });

    prisonersArea.selectAll('line')
      .data(this.props.data)
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

    const lines = prisonersArea.selectAll('line');
    Object.entries(lineStyle).forEach(([key, value]) => {
      lines.style(key, value);
    });
  }

  render() {
    return (
      <g
        ref={ref => this.area = ref}
        transform={`translate(${this.props.margin.right}, 1)`}
      />
    )
  }
}

export default PrisonersArea