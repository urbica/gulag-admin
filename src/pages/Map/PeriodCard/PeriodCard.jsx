import React from 'react';
import PropTypes from 'prop-types';

import { CardButton } from '../StyledButtons';

// images
import close from '../icons/btn-close.svg';
import preloader from '../icons/preloader.svg';

// styled
import Container from './Container';
import Title from './Title';
import Period from './Period';
import Description from './Description';

const PeriodCard = ({ period, currentLanguage, closeCard }) => {
  if (!period) {
    return (
      <Container>
        <img src={preloader} alt='preloader' />
      </Container>
    );
  }

  return (
    <Container>
      <CardButton onClick={closeCard}>
        <img src={close} alt='cross' />
      </CardButton>
      <Title>{period.name[currentLanguage]}</Title>
      <Period>{`${period.year_start} – ${period.year_end}`}</Period>
      <Description>{period.description[currentLanguage]}</Description>
    </Container>
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
  ]).isRequired,
  currentLanguage: PropTypes.string.isRequired,
  closeCard: PropTypes.func.isRequired
};

export default PeriodCard;
