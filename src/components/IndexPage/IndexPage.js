import React from 'react';
import Container from '../Container';
import Header from './Header/Header';
import Search from './Search/Search';
import PrisonsTable from './PrisonsTable/PrisonsTable';
import {values} from 'ramda';

const IndexPage = (props) => {
  const prisons = values(props.prisons);
  const prisons_ru_count = prisons.filter(prison => prison.published_ru).length;
  const prisons_en_count = prisons.filter(prison => prison.published_en).length;

  return (
    <div className='indexPage'>
      <Container>
        <Header
          prisonsAmount={ prisons.length }
          ru_prisonsAmount={ prisons_ru_count }
          en_prisonsAmount={ prisons_en_count  }
        />
        <Search/>
        <PrisonsTable prisons={ prisons }/>
      </Container>
    </div>
  );
};

export default IndexPage;