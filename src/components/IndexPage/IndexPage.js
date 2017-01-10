import React from 'react';
import {values} from 'ramda';
import Header from '../Header/Header';
import Search from '../Search/Search';
import PrisonsTable from '../PrisonsTable/PrisonsTable';

class IndexPage extends React.Component {
  render() {
    const PRISONS_ARR = values(this.props.prisons);
    const PRISONS_AMOUNT = PRISONS_ARR.length;
    const RU_PRISONS_AMOUNT = PRISONS_ARR.filter(prison => prison.published_ru).length;
    const EN_PRISONS_AMOUNT = PRISONS_ARR.filter(prison => prison.published_en).length;

    return (
      <div className='indexPage'>
        <Header prisonsAmount={ PRISONS_AMOUNT }
                ru_prisonsAmount={ RU_PRISONS_AMOUNT }
                en_prisonsAmount={ EN_PRISONS_AMOUNT  }
        />
        <Search/>
        <PrisonsTable prisons={ this.props.prisons }/>
      </div>
    );
  }
}

export default IndexPage;
