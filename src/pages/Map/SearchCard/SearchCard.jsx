import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { values } from 'ramda';
import PropTypes from 'prop-types';
import debounce from 'debounce';

import { Wrap, Header, Input, Item, Name } from './SearchCardStyles';
import { CardButton } from '../StyledButtons';
import { getRightLang, getPeriods } from '../../../utils/utils';
import getFirstYear from '../../../utils/prison-utils';
import cross from '../icons/btn-close.svg';

// styled
import Periods from './Periods';
import Location from './Location';

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
    const { closeSearchCard, prisons, currentLanguage, setYear, places } = this.props;

    const onChange = event => this.onSearchChange(event.target.value);
    const delayedOnChange = debounce(onChange, 300);

    const handleOnChange = (event) => {
      event.persist();
      delayedOnChange(event);
    };

    const search = this.state.searchQuery.trim().toLowerCase();
    const result = values(prisons).filter(prison =>
      prison.name[currentLanguage].toLowerCase().match(search) ||
      prison.additional_names[currentLanguage].toLowerCase().match(search) ||
      prison.description[currentLanguage].toLowerCase().match(search)
    );

    return (
      <Wrap>
        <Header>
          <Input
            placeholder='Поиск'
            onChange={handleOnChange}
            innerRef={ref => (this.input = ref)}
          />
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
                <Location>{places[p.place_id] ? places[p.place_id].name : ''}</Location>
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
