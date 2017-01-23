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
    const prisons_ru_count = prisons.filter(prison => prison.published_ru).length;
    const prisons_en_count = prisons.filter(prison => prison.published_en).length;

    const search = (e) => {
      this.setState({ searchQuery: e.target.value });
    };

    if (searchQuery.length > 0) {
      prisons = prisons.filter(prison => {
        const nameRu = prison.name_ru.toLowerCase();
        const nameEn = prison.name_en.toLowerCase();
        const maxPrisoners = String(prison.max_prisoners).toLowerCase();

        return nameRu.match(searchQuery)
          || nameEn.match(searchQuery)
          || maxPrisoners.match(searchQuery);
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
          <PrisonsTable prisons={ prisons }/>
        </Container>
      </div>
    );
  }
}

export default IndexPage;