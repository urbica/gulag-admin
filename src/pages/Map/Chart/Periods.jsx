import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { select } from 'd3-selection';

const G = styled.g`
  pointer-events: auto;
  font-size: 12px;
  & rect:hover {
    opacity: .3 !important;
  }
  & text {
    pointer-events: none;
    fill: #fff;
  }
`;

const wrap = (text) => {
  text.each(function () {
    const TEXT = select(this);
    const words = TEXT.text().split(/\s+/).reverse();
    const lineHeight = 14; // px
    const x = TEXT.attr('x');
    const y = TEXT.attr('y');

    let lineNumber = 0;
    let word = '';

    TEXT.text(null);

    while (word = words.pop()) {
      TEXT
        .append('tspan')
        .attr('x', x)
        .attr('y', parseInt(y) + (lineNumber++ * lineHeight))
        .attr('dx', '0.5em')
        .text(word);
    }
  });
};

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
      .attr('y', 0)
      .attr('x', (d) => {
        const date = new Date(d.year_start, 0, 1);
        return xScale(date);
      })
      .attr('width', (d) => {
        const dateStart = new Date(d.year_start, 0, 1);
        const dateEnd = new Date(d.year_end, 0, 1);
        return xScale(dateEnd) - xScale(dateStart);
      })
      .attr('height', margin.bottom)
      .attr('style', (d, i) => `
          fill: ${(i % 2) ? '#fff' : '#000'};
          opacity: .1;
        `)
      .on('click', d => onClick(d.id));

    periodsArea
      .selectAll('text')
      .data(periods)
      .enter()
      .append('text')
      .text(d => d.name.ru)
      .attr('dx', '.5em')
      .attr('x', (d) => {
        const date = new Date(d.year_start, 0, 1);
        return xScale(date);
      })
      .attr('y', 30)
      .call(wrap);
  }

  render() {
    const { height, margin } = this.props;

    return (
      <G
        innerRef={ref => (this.periodsArea = ref)}
        transform={`translate(${margin.left}, ${margin.top + height})`}
      />
    );
  }
}

Periods.propTypes = {
  height: PropTypes.number,
  margin: PropTypes.shape({
    top: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number
  }),
  xScale: PropTypes.func,
  periods: PropTypes.shape({
    id: PropTypes.number,
    year_end: PropTypes.number,
    year_start: PropTypes.number,
    description: PropTypes.shape({
      ru: PropTypes.string,
      en: PropTypes.string,
      de: PropTypes.string
    }),
    name: PropTypes.shape({
      ru: PropTypes.string,
      en: PropTypes.string,
      de: PropTypes.string
    })
  }),
  onClick: PropTypes.func
};

export default Periods;
