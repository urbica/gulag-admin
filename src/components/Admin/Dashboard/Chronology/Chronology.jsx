import React from 'react';
import PropTypes from 'prop-types';

// styled
import Container from './Container';
import Title from './Title';
import PeriodsWrapp from './PeriodsWrapp';
import Periods from './Periods';
import Period from './Period';
import Year from './Year';
import Button from './Button';

const Chronology = ({ periods, openChronology }) => (
  <Container>
    <Title>Хронология ГУЛАГа</Title>
    <PeriodsWrapp onClick={openChronology}>
      {periods.size !== 0 && (
        <Periods>
          {periods.map(period => (
            <Period key={period.get('id')}>
              <Year>{period.get('year')}</Year>
              <span>{period.getIn(['title', 'ru'])}</span>
            </Period>
          ))}
        </Periods>
      )}
    </PeriodsWrapp>
    {periods.size === 0 && <Button onClick={openChronology}>Добавить периоды</Button>}
  </Container>
);

Chronology.propTypes = {
  periods: PropTypes.object.isRequired,
  openChronology: PropTypes.func.isRequired
};

export default Chronology;
