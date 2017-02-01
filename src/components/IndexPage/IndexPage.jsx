import React from 'react';
import { values } from 'ramda';
import { Container, Six } from '../Layout';
import Header from './Header';
import Search from './Search';
import PrisonsTable from './PrisonsTable/PrisonsTable';

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: ''
    };
  }

  onSearchChange = (searchQuery) => {
    this.setState({ searchQuery });
  };

  filterBySearch = (searchQuery, prisons) => {
    if (searchQuery.length > 0) {
      return prisons.filter(prison => {
        const searchString = [
          prison.name.ru,
          prison.name.en,
          prison.additional_names.ru,
          prison.additional_names.en,
          prison.max_prisoners
        ].join(' ').toLowerCase();

        return searchString.match(searchQuery.trim().toLowerCase());
      });
    }

    return prisons;
  };

  render() {
    const prisons = values(this.props.prisons);
    const prisonsCount = prisons.length;

    const { publishedRuCount, publishedEnCount, publishedDeCount } = prisons.reduce((acc, prison) => {
      if (prison.published.ru) acc['publishedRuCount'] += 1;
      if (prison.published.en) acc['publishedEnCount'] += 1;
      if (prison.published.de) acc['publishedDeCount'] += 1;
      return acc;
    }, { publishedRuCount: 0, publishedEnCount: 0, publishedDeCount: 0 });

    const filteredPrisons = this.filterBySearch(this.state.searchQuery, prisons);

    return (
      <Container>
        <Six>
          <Header
            prisonsCount={ prisonsCount }
            publishedRuCount={ publishedRuCount }
            publishedEnCount={ publishedEnCount }
            publishedDeCount={ publishedDeCount }
            onLogout={ this.props.onLogout }
            createPrison={ this.props.createPrison }
          />
        </Six>
        <Six>

        </Six>
        <Six justify="center">
          <Search
            value={ this.state.searchQuery }
            onChange={ this.onSearchChange }
          />
        </Six>
        <Six>
          <PrisonsTable
            prisons={ filteredPrisons }
            places={ this.props.places }
            types={ this.props.types }
          />
        </Six>
      </Container>
    );
  }
}

export default IndexPage;
