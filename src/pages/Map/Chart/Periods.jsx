import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrap = styled.div`
  pointer-events: auto;
  position: absolute;
  display: flex;
  top: ${({ top }) => top}px;
  bottom: 0;
  left: ${({ left }) => left}px;
  width: ${({ width }) => width}px;
  color: #fff;
  z-index: 1;
`;

const Period = styled.div`
  display: inline-block;
  width: ${({ width }) => width}px;
  padding-top: 15px;
  padding-left: 3px;
  font-size: 12px;
  background-color: rgba(${({ id }) => id % 2 ? '255,255,255' : '0,0,0'},.1);
  &:hover {
    background-color: rgba(${({ id }) => id % 2 ? '255,255,255' : '0,0,0'},.3);
  }
`;

const getWidth = (scale, endYear, startYear) => {
  const dateEnd = new Date(endYear, 0, 1);
  const dateStart = new Date(startYear, 0, 1);

  return Math.round(scale(dateEnd) - scale(dateStart));
};

const Periods = (props) => {
  const { width, height, margin, xScale, onClick } = props;
  const periods = Object.values(props.periods);

  return (
    <Wrap
      top={height + margin.top}
      width={width}
      left={margin.left}
    >
      {
        periods.map(period => (
          <Period
            key={period.id}
            id={period.id}
            width={getWidth(xScale, period.year_end, period.year_start)}
            onClick={onClick.bind(null, period.id)}
          >
            <div>{period.year_start}</div>
            <div>{period.name.ru}</div>
          </Period>
        ))
      }
    </Wrap>
  );
};

Periods.propTypes = {
  width: PropTypes.number,
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
