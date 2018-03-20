import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { filterBySearch } from '../../../utils/utils';

// components
import Header from './Header/Header';
import Chronology from './Chronology/Chronology';
import Search from './Search/Search';
import Camps from './Camps/Camps';

// styled
import Container from './Container';

class Dashboard extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: ''
    };
  }

  render() {
    const {
      camps,
      places,
      types,
      periods,
      logout,
      createCamp,
      openCamp,
      openChronology
    } = this.props;

    const { publishedRuCount, publishedEnCount, publishedDeCount } = camps.reduce(
      (acc, camp) => {
        /* eslint-disable no-param-reassign */
        if (camp.getIn(['published', 'ru'])) acc.publishedRuCount += 1;
        if (camp.getIn(['published', 'en'])) acc.publishedEnCount += 1;
        if (camp.getIn(['published', 'de'])) acc.publishedDeCount += 1;
        /* eslint-enable no-param-reassign */
        return acc;
      },
      { publishedRuCount: 0, publishedEnCount: 0, publishedDeCount: 0 }
    );

    return (
      <Container>
        <Header
          campsCount={this.props.camps.size}
          publishedRuCount={publishedRuCount}
          publishedEnCount={publishedEnCount}
          publishedDeCount={publishedDeCount}
          logout={logout}
          createCamp={createCamp}
        />
        <Chronology periods={periods} openChronology={openChronology} />
        <Search
          value={this.state.searchQuery}
          onChange={val => this.setState({ searchQuery: val })}
        />
        <Camps
          camps={filterBySearch(this.state.searchQuery, camps)}
          openCamp={openCamp}
          places={places}
          types={types}
        />
      </Container>
    );
  }
}

Dashboard.propTypes = {
  camps: PropTypes.object,
  places: PropTypes.object,
  types: PropTypes.object,
  periods: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  createCamp: PropTypes.func.isRequired,
  openCamp: PropTypes.func.isRequired,
  openChronology: PropTypes.func.isRequired
};

Dashboard.defaultProps = {
  camps: null,
  places: null,
  types: null
};

export default Dashboard;
