import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'debounce';
import { Link } from 'react-router-dom';
import { Wrap, Header, Input, Button, Item } from './SearchCardStyles';
import cross from '../cross.svg';

class SearchCard extends Component {
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
    const { closeSearchCard, prisons, currentLanguage } = this.props;

    const onChange = event => this.onSearchChange(event.target.value);
    const delayedOnChange = debounce(onChange, 300);

    const handleOnChange = (event) => {
      event.persist();
      delayedOnChange(event);
    };

    const search = this.state.searchQuery.trim().toLowerCase();
    const result = Object.values(prisons).filter(prison =>
      prison.name.ru.toLowerCase().match(search) ||
      prison.name.en.toLowerCase().match(search) ||
      prison.name.de.toLowerCase().match(search)
    );

    return (
      <Wrap>
        <Header>
          <Input onChange={handleOnChange} />
          <Button onClick={closeSearchCard}>
            <img src={cross} alt='cross' />
          </Button>
        </Header>
        <div>
          {
            result.map(p => (
              <Item key={p.id}>
                <Link to={`/prison${p.id}`}>
                  {
                    p.name[currentLanguage] ||
                    p.name.en ||
                    p.name.ru
                  }
                </Link>
              </Item>
            ))
          }
        </div>
      </Wrap>
    );
  }
}

SearchCard.propTypes = {
  closeSearchCard: PropTypes.func,
  currentLanguage: PropTypes.string
};

export default SearchCard;
