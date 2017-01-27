import React from 'react';
import { values } from 'ramda';
import styled from 'styled-components';
import { Container, Six } from '../Layout';
import Header from './Header';
import Search from './Search';
import PrisonsTable from './PrisonsTable/PrisonsTable';

const SixFlex = styled(Six)`
  display: flex;
`;

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

    const { publishedRuCount, publishedEnCount } = prisons.reduce((acc, prison) => {
      if (prison.published.ru) acc['publishedRuCount'] += 1;
      if (prison.published.en) acc['publishedEnCount'] += 1;
      return acc;
    }, { publishedRuCount: 0, publishedEnCount: 0 });

    const filteredPrisons = this.filterBySearch(this.state.searchQuery, prisons);

    return (
      <Container>
        <Six>
          <Header
            prisonsCount={ prisonsCount }
            publishedRuCount={ publishedRuCount }
            publishedEnCount={ publishedEnCount  }
            onLogout={ this.props.onLogout }
            createPrison={ this.props.createPrison }
          />
        </Six>
        <SixFlex>
          <Search
            value={ this.state.searchQuery }
            onChange={ this.onSearchChange }
          />
        </SixFlex>
        <Six>
          <PrisonsTable
            prisons={ filteredPrisons }
            places={ this.props.places }
          />
        </Six>
      </Container>
    );
  }
}

export default IndexPage;
