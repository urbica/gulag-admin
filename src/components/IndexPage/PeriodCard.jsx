import React from 'react'
import styled, { keyframes } from 'styled-components'

const slide = keyframes`
  from {
    transform: translateX(calc(100% + 10px));
  }
  to {
    transform: translateX(0);
  }
`;

const Wrap = styled.div`
  position: fixed;
  top: 90px;
  right: 10px;
  width: 320px;
  max-height: 590px;
  padding: 40px 40px 20px 20px;
  background-color: #222;
  color: #fff;
  font-size: 14px;
  font-family: 'PT Sans', sans-serif;
  overflow: scroll;
  animation: ${slide} .4s;
  z-index: 1;
`;

const Period = styled.div`
  margin-bottom: 5px;
`;

const Title = styled.div`
  margin-bottom: 5px;
  font-size: 34px;
`;

const Description = styled.div`
  font-size: 16px;
`;

const PeriodCard = (props) => {
  const { period, currentLanguage } = props;

  return Boolean(period) ?
    (
      <Wrap>
        <Period>{ `${period.year_start} – ${period.year_end}` }</Period>
        <Title>{ period.name[currentLanguage] }</Title>
        <Description>{ period.description[currentLanguage] }</Description>
      </Wrap>
    ) : <Wrap>Загрузка</Wrap>
};

export default PeriodCard