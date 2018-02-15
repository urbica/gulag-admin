import React from 'react';
import PropTypes from 'prop-types';

// styled
import Container from './Container';
import Title from './Title';
import Button from './Button';

const Periods = ({ periods, openPeriod }) => (
  <Container>
    <Title>Периоды</Title>
    {periods.map(period => (
      <Button
        key={period.get('id')}
        onClick={openPeriod.bind(null, period.get('id'))}
      >
        {period.getIn(['name', 'ru'])}
      </Button>
    ))}
  </Container>
);

Periods.propTypes = {
  periods: PropTypes.object.isRequired,
  openPeriod: PropTypes.func.isRequired
};

export default Periods;
