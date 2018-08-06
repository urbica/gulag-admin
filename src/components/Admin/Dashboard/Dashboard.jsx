import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// components
import Header from './Header/Header';
import Chronology from './Chronology/Chronology';
import Search from './Search';
import Camps from './Camps';

// styled
import Container from './Container';

class Dashboard extends PureComponent {
  render() {
    const {
      camps,
      places,
      types,
      periods,
      logout,
      createCamp,
      openCamp,
      openChronology,
      publishedRuCount,
      publishedEnCount,
      publishedDeCount
    } = this.props;

    return (
      <Container>
        <Header
          campsCount={camps.size}
          publishedRuCount={publishedRuCount}
          publishedEnCount={publishedEnCount}
          publishedDeCount={publishedDeCount}
          logout={logout}
          createCamp={createCamp}
        />
        <Chronology periods={periods} openChronology={openChronology} />
        <Search />
        <Camps
          openCamp={openCamp}
          places={places}
          types={types}
        />
      </Container>
    );
  }
}

Dashboard.propTypes = {
  camps: PropTypes.object.isRequired,
  places: PropTypes.object.isRequired,
  types: PropTypes.object.isRequired,
  periods: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  createCamp: PropTypes.func.isRequired,
  openCamp: PropTypes.func.isRequired,
  openChronology: PropTypes.func.isRequired,
  publishedRuCount: PropTypes.number.isRequired,
  publishedEnCount: PropTypes.number.isRequired,
  publishedDeCount: PropTypes.number.isRequired
};

export default Dashboard;
