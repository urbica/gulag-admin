import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ButtonTemplate from './StyledButton';
import close from './icons/btn-close.svg';

const Wrap = styled.div`
  position: fixed;
  top: 90px;
  right: 10px;
  width: 400px;
  max-height: 590px;
  padding: 40px 60px 40px 60px;
  background-color: #000;
  color: #fff;
  font-size: 14px;
  font-family: 'PT Sans', sans-serif;
  overflow: scroll;
  z-index: 1;
`;

const Button = styled(ButtonTemplate)`
  position: absolute;
  top: 0;
  right: 0;
`;

const Period = styled.div`
  margin-bottom: 30px;
  font-size: 16px;
  opacity: 0.8;
`;

const Title = styled.div`
  margin-bottom: 5px;
  font-size: 24px;
  font-weight: bold;
`;

const Description = styled.div`
  font-size: 16px;
  opacity: 0.8;
`;

const PeriodCard = ({ period, currentLanguage, closeCard }) => {
  if (!period) {
    return <Wrap>Загрузка</Wrap>;
  }

  return (
    <Wrap>
      <Button onClick={closeCard}>
        <img src={close} alt='cross' />
      </Button>
      <Title>{period.name[currentLanguage]}</Title>
      <Period>{`${period.year_start} – ${period.year_end}`}</Period>
      <Description>{period.description[currentLanguage]}</Description>
    </Wrap>
  );
};

PeriodCard.propTypes = {
  period: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      name: PropTypes.shape({
        ru: PropTypes.sting,
        en: PropTypes.sting,
        de: PropTypes.sting
      }),
      year_start: PropTypes.number,
      year_end: PropTypes.number,
      description: PropTypes.shape({
        ru: PropTypes.sting,
        en: PropTypes.sting,
        de: PropTypes.sting
      })
    })
  ]),
  currentLanguage: PropTypes.string,
  closeCard: PropTypes.func
};

export default PeriodCard;
