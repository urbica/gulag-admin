import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { comparator, equals, lensPath, view } from 'ramda';
import PrisonRow from './PrisonRow';
import { getFirstYearInFeatures } from '../../../utils/utils';
import './PrisonsTable.css';

const SortTypes = { ASC: 'ASC', DESC: 'DESC' };
const collator = new Intl.Collator('ru', {
  ignorePunctuation: true,
  numeric: true
});

const getSortTriangleStyles = (sortDir) => {
  switch (sortDir) {
    case SortTypes.ASC:
      return `
      &:after {
        position: absolute;
        margin-left: 5px;
        margin-top: 2px;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 6px 10px 6px;
        border-color: transparent transparent #000 transparent;
        content: '';
      }
    `;
    case SortTypes.DESC:
      return `
      &:after {
        position: absolute;
        margin-left: 5px;
        margin-top: 2px;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 10px 6px 0 6px;
        border-color: #000 transparent transparent transparent;
        content: '';
      }
    `;
    default:
      return '';
  }
};

const ColumnHeader = styled.td`
  border-top: none;
  text-transform: uppercase;
  font-size: 14px;
  white-space: nowrap;
  padding: 0 40px 10px 0;
  cursor: pointer;

  &:hover {
    opacity: .5;
    transition: .2s;
  }

  ${props => getSortTriangleStyles(props.sortDir)};
`;

class PrisonsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortBy: ['name', 'ru'],
      sortDir: SortTypes.ASC
    };
    this.sort = this.sort.bind(this);
    this.getOrderedPrisons = this.getOrderedPrisons.bind(this);
  }

  getOrderedPrisons() {
    const { prisons, places, types } = this.props;
    const { sortBy, sortDir } = this.state;

    const getComparator = (sortBy) => {
      if (sortBy[0] === 'name') {
        return (a, b) => {
          const aName = view(lensPath(sortBy), a);
          const bName = view(lensPath(sortBy), b);
          return collator.compare(aName, bName);
        };
      } else if (sortBy[0] === 'period') {
        return comparator((a, b) => {
          const aFirstYear = getFirstYearInFeatures(a.features);
          const bFirstYear = getFirstYearInFeatures(b.features);
          return aFirstYear < bFirstYear;
        });
      } else if (sortBy[0] === 'updated_at') {
        return comparator((a, b) => new Date(a.updated_at) < new Date(b.updated_at));
      } else if (sortBy[0] === 'place_id') {
        return (a, b) => {
          const aPlaceName = view(lensPath([a.place_id, 'name']), places);
          const bPlaceName = view(lensPath([b.place_id, 'name']), places);
          return collator.compare(aPlaceName, bPlaceName);
        };
      } else if (sortBy[0] === 'type_id') {
        return (a, b) => {
          const aTypesName = view(lensPath([a.type_id, 'name']), types);
          const bTypesName = view(lensPath([b.type_id, 'name']), types);
          return collator.compare(aTypesName, bTypesName);
        };
      } else if (sortBy[0] === 'max_prisoners') {
        return comparator((a, b) => a.max_prisoners < b.max_prisoners);
      } else if (sortBy[0] === 'published') {
        return comparator((a, b) => {
          const aPublished = view(lensPath(sortBy), a);
          const bPublished = view(lensPath(sortBy), b);
          return aPublished < bPublished;
        });
      }
    };

    const comp = getComparator(sortBy);

    if (sortDir === SortTypes.DESC) {
      return prisons.sort(comp).reverse();
    }

    return prisons.sort(comp);
  }

  sort(sortBy) {
    if (equals(this.state.sortBy, sortBy)) {
      this.setState({
        sortBy,
        sortDir: this.state.sortDir === SortTypes.ASC ? SortTypes.DESC : SortTypes.ASC
      });
    } else {
      this.setState({ sortBy, sortDir: SortTypes.ASC });
    }
  }

  render() {
    const { sortDir } = this.state;
    const prisons = this.getOrderedPrisons();

    // console.log(this.props.history);
    return (
      <table className='prisons'>
        <thead>
          <tr>
            <ColumnHeader
              onClick={this.sort.bind(this, ['name', 'ru'])}
              sortDir={equals(this.state.sortBy, ['name', 'ru']) ? sortDir : ''}
            >
              Название
            </ColumnHeader>
            <ColumnHeader
              onClick={this.sort.bind(this, ['period'])}
              sortDir={equals(this.state.sortBy, ['period']) ? sortDir : ''}
            >
              Период
            </ColumnHeader>
            <ColumnHeader
              onClick={this.sort.bind(this, ['updated_at'])}
              sortDir={equals(this.state.sortBy, ['updated_at']) ? sortDir : ''}
            >
              Отредактировано
            </ColumnHeader>
            <ColumnHeader
              onClick={this.sort.bind(this, ['place_id'])}
              sortDir={equals(this.state.sortBy, ['place_id']) ? sortDir : ''}
            >
              Регион
            </ColumnHeader>
            <ColumnHeader
              onClick={this.sort.bind(this, ['type_id'])}
              sortDir={equals(this.state.sortBy, ['type_id']) ? sortDir : ''}
            >
              Тип лагеря
            </ColumnHeader>
            <ColumnHeader
              onClick={this.sort.bind(this, ['max_prisoners'])}
              sortDir={equals(this.state.sortBy, ['max_prisoners']) ? sortDir : ''}
            >
              Макс. числ.
            </ColumnHeader>
            <ColumnHeader
              onClick={this.sort.bind(this, ['published', 'ru'])}
              sortDir={equals(this.state.sortBy, ['published', 'ru']) ? sortDir : ''}
            >
              Рус
            </ColumnHeader>
            <ColumnHeader
              onClick={this.sort.bind(this, ['published', 'en'])}
              sortDir={equals(this.state.sortBy, ['published', 'en']) ? sortDir : ''}
            >
              Eng
            </ColumnHeader>
            <ColumnHeader
              onClick={this.sort.bind(this, ['published', 'de'])}
              sortDir={equals(this.state.sortBy, ['published', 'de']) ? sortDir : ''}
            >
              Deu
            </ColumnHeader>
          </tr>
        </thead>
        <tbody>
          {
            prisons.map(prison =>
              <PrisonRow
                prison={prison}
                key={prison.id}
                places={this.props.places}
                types={this.props.types}
                history={this.props.history}
              />
            )
          }
        </tbody>
      </table>
    );
  }
}

PrisonsTable.propTypes = {
  prisons: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.shape({
      ru: PropTypes.string,
      en: PropTypes.string,
      de: PropTypes.string
    }),
    updated_at: PropTypes.string,
    place_id: PropTypes.number,
    type_id: PropTypes.number,
    max_prisoners: PropTypes.number,
    published: PropTypes.shape({
      ru: PropTypes.bool,
      en: PropTypes.bool,
      de: PropTypes.bool
    })
  })),
  places: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string
  })),
  types: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string
  }))
};

export default PrisonsTable;
