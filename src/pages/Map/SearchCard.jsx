import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import debounce from 'debounce';
import { Link } from 'react-router-dom';

const Wrap = styled.div`
  display: ${({ visible }) => visible ? 'block' : 'none'};
  position: fixed;
  top: 0;
  bottom: 0;
  width: 430px;
  overflow: scroll;
  color: #fff;
  background-color: #222;
  z-index: 2;
  & a {
    color: #fff;
  }
`;

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
    const { visible, closeSearchCard, prisons } = this.props;

    const onChange = event => this.onSearchChange(event.target.value);
    const delayedOnChange = debounce(onChange, 300);

    const handleOnChange = (event) => {
      event.persist();
      delayedOnChange(event);
    };

    const search = this.state.searchQuery.trim().toLowerCase();
    const result = Object.values(prisons).filter(prison =>
      prison.name.ru.toLowerCase().match(search));

    return (
      <Wrap visible={visible}>
        <button onClick={closeSearchCard}>close</button>
        <input onChange={handleOnChange} />
        {
          result.map(p => (
            <div key={p.id}>
              <Link to={`/prison${p.id}`}>
                {p.name.ru}
              </Link>
            </div>
          ))
        }
      </Wrap>
    );
  }
}

SearchCard.propTypes = {
  visible: PropTypes.bool,
  closeSearchCard: PropTypes.func
};

export default SearchCard;
