import React from 'react';
import Button from '../Button/Button';
import { Link } from 'react-router';

const calculatePeriod = (features) => {
  return features.map((location, key) => {
    const YEARS = Object.keys(location.properties);
    if (YEARS.length === 3) {
      return <div key={ key }>{ YEARS[0] };</div>
    } else if (YEARS.length > 2) {
      return <div key={ key }>{ YEARS[0] + ' – ' + YEARS[YEARS.length - 3] };</div>
    } else return null
  });
}

const PrisonHeader = (props) => {
  const { prison } = props;
  return (
    <header className='prison__header'>
      <Link to='/admin/prisons' className='prison__back-link'>← к таблице лагерей</Link>
      <div className='prison__title'>
        <div className='prison__title-name'>{ prison.name_ru }</div>
        <div className='prison__title-period'>
          { calculatePeriod(prison.features) }
        </div>
      </div>
      <div>
        <Button color={ 'red' } title={ 'удалить' }/>
        <div className='prison__saved'>
          <div>Сохранено:</div>
          {/*<span className='prison__saved-date'>{ this.props.PRISON.edited.date }</span>*/}
          {/*<span>{ this.props.PRISON.edited.time }</span>*/}
        </div>
      </div>
    </header>
  );
}

export default PrisonHeader;
