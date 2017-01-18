import React from 'react';
import {browserHistory} from 'react-router';

const PrisonRow = (props) => {
  const {prison} = props;
  const features = prison.features || [];
  const url = `/admin/prisons/${prison.id}`;
  const openPrison = browserHistory.push.bind(browserHistory, url);
  return (
    <tr onClick={ openPrison }>
      <td className='prisons__cell' height='56'>{prison.name_ru}</td>
      <td className='prisons__cell prisons__cell_period'>
        {
          features.map((location, key) => {
            const YEARS = Object.keys(location.properties);
            if (YEARS.length === 1) {
              return <div key={ key }>{ YEARS[0] };</div>
            } else if (YEARS.length > 1) {
              return <div key={ key }>{ YEARS[0] + ' – ' + YEARS[YEARS.length - 1] };</div>
            } else return null
          })
        }
      </td>
      <td className='prisons__cell'>{ prison.updated_at }</td>
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
