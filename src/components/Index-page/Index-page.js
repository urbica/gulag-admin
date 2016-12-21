import React from 'react';
import Header from '../Header/Header';
import Search from '../Search/Search';
import PrisonsTable from '../Prisons-table/Prisons-table';

class IndexPage extends React.Component{
  render() {
    return (
      <div className='indexPage'>
        <Header/>
        <Search/>
        <PrisonsTable prisons={ this.props.prisons }/>
      </div>
    );
  }
}

export default IndexPage;
