import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header/Header';
import Periods from './Periods/Periods';

// styled
import Container from './Container';

const Chronology = props => (
  <Container>
    <Header goBack={props.pushToDashboard} />
    <Periods
      periods={props.periods}
      createPeriod={props.createPeriod}
      deletePeriod={props.deletePeriod}
    />
  </Container>
);

Chronology.propTypes = {
  pushToDashboard: PropTypes.func.isRequired,
  periods: PropTypes.object.isRequired,
  createPeriod: PropTypes.func.isRequired,
  deletePeriod: PropTypes.func.isRequired
};

export default Chronology;
