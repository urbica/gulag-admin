import React from 'react';
import {browserHistory} from 'react-router';

const getPeriods = (features) =>
  features
    .map(feature => Object.keys(feature.properties).map(year => parseInt(year, 10)))
    .filter(years => years.length > 0)
    .map(years => `${Math.min.apply(Math, years)} — ${Math.max.apply(Math, years)}`)
    .join('; ');

const PrisonRow = (props) => {
  const {prison} = props;
  const features = prison.features || [];
  const url = `/admin/prisons/${prison.id}`;
  const openPrison = browserHistory.push.bind(browserHistory, url);
  return (
    <tr onClick={ openPrison }>
      <td className='prisons__cell' height='56'>{prison.name_ru}</td>
      <td className='prisons__cell prisons__cell_period'>
        { getPeriods(features) }
      </td>
      <td className='prisons__cell'>{ (new Date(prison.updated_at)).toLocaleString() }</td>
      <td className='prisons__cell'>регион</td>
      <td className='prisons__cell prisons__strength'>
        <span>{ String(prison.max_prisoners).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ') }</span>
      </td>
      <td className='prisons__cell'>{ prison.published_ru ? 'да' : 'нет' }</td>
      <td className='prisons__cell'>{ prison.published_en ? 'да' : 'нет' }</td>
    </tr>
  );
};

export default PrisonRow;
