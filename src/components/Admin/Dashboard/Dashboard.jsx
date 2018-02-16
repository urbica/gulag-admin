import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';

// actions
import { logout } from '../../App/authReducer';
import { createCamp } from '../../App/dataReducer';

// selectors
import { campsSelector, placesSelector, typesSelector } from '../../App/dataSelectors';

// components
import Header from './Header/Header';
import Chronology from './Chronology/Chronology';
import Search from './Search/Search';
import Camps from './Camps/Camps';

// styled
import Container from './Container';
import { filterBySearch } from '../../../utils/utils';

class Dashboard extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: ''
    };

    this.logout = this.logout.bind(this);
    this.createCamp = this.createCamp.bind(this);
    this.openPeriod = this.openPeriod.bind(this);
    this.openCamp = this.openCamp.bind(this);
  }

  logout() {
    this.props.dispatch(logout());
  }

  createCamp() {
    this.props.dispatch(createCamp());
  }

  openPeriod(id) {
    this.props.dispatch(push(`/admin/period${id}`));
  }

  openCamp(id) {
    this.props.dispatch(push(`/admin/camp${id}`));
  }

  render() {
    const { camps, places, types } = this.props;

    const {
      publishedRuCount, publishedEnCount, publishedDeCount
    } = camps.reduce((acc, camp) => {
      /* eslint-disable no-param-reassign */
      if (camp.getIn(['published', 'ru'])) acc.publishedRuCount += 1;
      if (camp.getIn(['published', 'en'])) acc.publishedEnCount += 1;
      if (camp.getIn(['published', 'de'])) acc.publishedDeCount += 1;
      /* eslint-enable no-param-reassign */
      return acc;
    }, { publishedRuCount: 0, publishedEnCount: 0, publishedDeCount: 0 });

    return (
      <Container>
        <Header
          campsCount={this.props.camps.size}
          publishedRuCount={publishedRuCount}
          publishedEnCount={publishedEnCount}
          publishedDeCount={publishedDeCount}
          logout={this.logout}
          createCamp={this.createCamp}
        />
        <Chronology />
        <Search
          value={this.state.searchQuery}
          onChange={val => this.setState({ searchQuery: val })}
        />
        <Camps
          camps={filterBySearch(this.state.searchQuery, camps)}
          openCamp={this.openCamp}
          places={places}
          types={types}
        />
      </Container>
    );
  }
}

Dashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  camps: PropTypes.object,
  places: PropTypes.object,
  types: PropTypes.object
};

Dashboard.defaultProps = {
  camps: null,
  places: null,
  types: null
};

const selector = createSelector(
  campsSelector,
  placesSelector,
  typesSelector,
  (camps, places, types) => ({
    camps, places, types
  })
);

export default connect(selector)(Dashboard);
