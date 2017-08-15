/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import { values } from 'ramda';
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
  @media (max-width: 1023px) {
    display: none;
  }
`;

const Period = styled.div`
  display: inline-block;
  width: ${({ width }) => width}px;
  padding-top: 12px;
  padding-left: 7px;
  font-size: 12px;
  background-color: rgba(${({ id }) => (id % 2 ? '0,0,0,.2)' : '0,0,0,.1)')};
  & div:last-child {
    opacity: .8;
  }
  &:hover {
    background-color: rgba(0,0,0,.3);
    & div:last-child {
      opacity: 1;
    }
  }
`;

const Year = styled.div`
  margin-bottom: 5px;
`;

const getWidth = (scale, endYear, startYear) => {
  const dateEnd = new Date(endYear, 0, 1);
  const dateStart = new Date(startYear, 0, 1);

  return Math.round(scale(dateEnd) - scale(dateStart));
};

const Periods = (props) => {
  const { width, height, margin, xScale, onClick } = props;
  const periods = values(props.periods);

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
            <Year>{period.year_start}</Year>
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
