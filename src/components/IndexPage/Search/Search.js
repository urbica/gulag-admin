import React, {Component} from 'react';
import './Search.css'

class Search extends Component {
  render() {
    return (
      <div className="search">
        <div className="container">
          <div className="search-wrap">
            <span className="fa fa-search"/>
            <input className="search__input"
                   type="text"
                   placeholder="Поиск"
                   onChange={this.props.search}
            />
            <div className="search__line"/>
          </div>
        </div>
      </div>
    )
  }
}

export default Search;