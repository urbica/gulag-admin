import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { values } from 'ramda';
import { Container, Six } from './Layout';
import Header from './Header';
import Periods from './Periods';
import Search from './Search';
import PrisonsTable from './PrisonsTable';
import { filterBySearch } from '../../utils/utils';

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: ''
    };
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onSearchChange(searchQuery) {
    this.setState({ searchQuery });
  }

  render() {
    const prisons = values(this.props.prisons);
    const prisonsCount = prisons.length;

    const {
      publishedRuCount, publishedEnCount, publishedDeCount
    } = prisons.reduce((acc, prison) => {
      /* eslint-disable no-param-reassign */
      if (prison.published.ru) acc.publishedRuCount += 1;
      if (prison.published.en) acc.publishedEnCount += 1;
      if (prison.published.de) acc.publishedDeCount += 1;
      /* eslint-enable no-param-reassign */
      return acc;
    }, { publishedRuCount: 0, publishedEnCount: 0, publishedDeCount: 0 });

    const filteredPrisons = filterBySearch(this.state.searchQuery, prisons);

    return (
      <Container>
        <Six>
          <Header
            prisonsCount={prisonsCount}
            publishedRuCount={publishedRuCount}
            publishedEnCount={publishedEnCount}
            publishedDeCount={publishedDeCount}
            onLogout={this.props.onLogout}
            createPrison={this.props.createPrison}
          />
        </Six>
        <Six>
          <Periods periods={this.props.periods} />
        </Six>
        <Six justify='center'>
          <Search
            value={this.state.searchQuery}
            onChange={this.onSearchChange}
          />
        </Six>
        <Six>
          <PrisonsTable
            history={this.props.history}
            prisons={filteredPrisons}
            places={this.props.places}
            types={this.props.types}
          />
        </Six>
      </Container>
    );
  }
}

AdminPage.propTypes = {
  prisons: PropTypes.object,
  onLogout: PropTypes.func,
  createPrison: PropTypes.func,
  periods: PropTypes.object,
  places: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    })
  ),
  types: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    })
  )
};

export default AdminPage;
