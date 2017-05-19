import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import debounce from 'debounce';

import { Wrap, Header, Input, Item, Name, Periods } from './SearchCardStyles';
import { CardButton } from '../StyledButtons';
import { getRightLang, getPeriods } from '../../../utils/utils';
import { getFirstYear } from '../../../utils/prison-utils';
import cross from '../icons/btn-close.svg';

class SearchCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: ''
    };
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  componentDidMount() {
    this.input.focus();
  }

  onSearchChange(searchQuery) {
    this.setState({ searchQuery });
  }

  render() {
    const { closeSearchCard, prisons, currentLanguage, setYear } = this.props;

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
          <Input onChange={handleOnChange} innerRef={ref => (this.input = ref)} />
          <CardButton onClick={closeSearchCard}>
            <img src={cross} alt='cross' />
          </CardButton>
        </Header>
        <div>
          {
            result.map(p => (
              <Item
                key={p.id}
                onClick={() => {
                  setYear(getFirstYear(p));
                  this.props.history.push(`/prison${p.id}`);
                }}
              >
                <Name>{getRightLang(p.name, currentLanguage)}</Name>
                <Periods>{getPeriods(p)}</Periods>
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

export default withRouter(SearchCard);
