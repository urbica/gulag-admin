import React from 'react';
import styled from 'styled-components';

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
  transition: .4s;
  transform: translateX(${props => props.visible ? '0' : 'calc(100% + 10px)'});
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
  const { period, currentLanguage, visible, closeCard } = props;

  if (!period) {
    return <Wrap visible={visible}>Загрузка</Wrap>;
  }

  return (
    <Wrap visible={visible}>
      <button onClick={closeCard}>закрыть</button>
      <Period>{`${period.year_start} – ${period.year_end}`}</Period>
      <Title>{period.name[currentLanguage]}</Title>
      <Description>{period.description[currentLanguage]}</Description>
    </Wrap>
  );
};

export default PeriodCard;
