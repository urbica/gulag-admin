import React from 'react';
import PropTypes from 'prop-types';

const Periods = ({ periods, createPeriod, deletePeriod }) => (
  <div>
    {periods.map(period => (
      <div key={period.get('id')}>
        <div>{period.get('id')}</div>
        <div>{period.get('year')}</div>
        <div>{period.getIn(['title', 'ru'])}</div>
        <div>{period.getIn(['descriptions', 'ru'])}</div>
        <button onClick={deletePeriod.bind(null, period.get('id'))}>
          delete period{period.get('id')}
        </button>
      </div>
    ))}
    <button onClick={createPeriod}>Добавить ещё период</button>
  </div>
);

Periods.propTypes = {
  periods: PropTypes.object.isRequired,
  createPeriod: PropTypes.func.isRequired,
  deletePeriod: PropTypes.func.isRequired
};

export default Periods;
