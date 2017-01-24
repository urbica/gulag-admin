import React from 'react';
import Container from '../Container';
import Header from './Header';
import Search from './Search';
import PrisonsTable from './PrisonsTable/PrisonsTable';
import { values } from 'ramda';

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: ''
    };
  }

  render() {
    const searchQuery = this.state.searchQuery.trim().toLowerCase();
    let prisons = values(this.props.prisons);
    const prisonsAmount = prisons.length;
    const prisons_ru_count = prisons.filter(prison => prison.published.ru).length;
    const prisons_en_count = prisons.filter(prison => prison.published.en).length;

    const search = (e) => {
      this.setState({ searchQuery: e.target.value });
    };

    if (searchQuery.length > 2) {
      prisons = prisons.filter(prison => {
        const searchString = [
          prison.name.ru,
          prison.name.en,
          prison.additional_names.ru,
          prison.additional_names.en,
          prison.max_prisoners
        ].join(' ').toLowerCase();

        return searchString.match(searchQuery);
      });
    }

    return (
      <div>
        <Container>
          <Header
            prisonsAmount={ prisonsAmount }
            ru_prisonsAmount={ prisons_ru_count }
            en_prisonsAmount={ prisons_en_count  }
            onLogout={ this.props.onLogout }
          />
          <Search search={ search }/>
          <PrisonsTable prisons={ prisons } places={ this.props.places }/>
        </Container>
      </div>
    );
  }
}

export default IndexPage;
