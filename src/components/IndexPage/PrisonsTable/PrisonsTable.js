import React from 'react';
import PrisonRow from './PrisonRow';
import classnames from 'classnames';
import './PrisonsTable.css'

const SortTypes = { ASC: 'ASC', DESC: 'DESC' };
const collator = new Intl.Collator('ru', {
  ignorePunctuation: true,
  numeric: true
});

class PrisonsTable extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      sortBy: 'name_ru',
      sortDir: SortTypes.ASC
    };
  }

  sort = (sortBy) => {
    if (this.state.sortBy === sortBy) {
      this.setState({
        sortBy,
        sortDir: this.state.sortDir === SortTypes.ASC ? SortTypes.DESC : SortTypes.ASC
      });
    } else {
      this.setState({ sortBy, sortDir: SortTypes.ASC });
    }
  };

  getOrderedPrisons = () => {
    const { prisons } = this.props;
    const { sortBy, sortDir } = this.state;
    const comparator = (a, b) => collator.compare(a[sortBy], b[sortBy]);

    if (sortDir === SortTypes.DESC) {
      return prisons.sort(comparator).reverse();
    }

    return prisons.sort(comparator);
  };

  render() {
    const { sortBy, sortDir } = this.state;
    const prisons = this.getOrderedPrisons();

    const getClassNames = (attr) => classnames({
      [`sort_${sortDir}`]: sortBy === attr
    });

    return (
      <table className='prisons'>
        <thead>
        <tr>
          <td
            className={ getClassNames('name_ru') }
            onClick={ this.sort.bind(this, 'name_ru') }
          >
            Название
          </td>
          <td>Период</td>
          <td>Отредактировано</td>
          <td>Регион</td>
          <td
            className={ getClassNames('max_prisoners') }
            onClick={ this.sort.bind(this, 'max_prisoners') }
          >
            Макс. числ.
          </td>
          <td>Рус</td>
          <td>Eng</td>
        </tr>
        </thead>
        <tbody>
        {
          prisons.map(prison =>
            <PrisonRow prison={ prison } key={ prison.id } places={ this.props.places }/>
          )
        }
        </tbody>
      </table>
    )
  }
}

export default PrisonsTable;