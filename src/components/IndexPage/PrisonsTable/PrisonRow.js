import React from 'react';
import moment from 'moment';
import { browserHistory } from 'react-router';
import { getPeriods } from '../../../utils/utils';

const PrisonRow = (props) => {
  const { prison, places } = props;
  const url = `/admin/prisons/${prison.id}`;
  const openPrison = browserHistory.push.bind(browserHistory, url);
  return (
    <tr onClick={ openPrison }>
      <td className='prisons__cell' height='56'>{prison.name.ru}</td>
      <td className='prisons__cell prisons__cell_period'>{ getPeriods(prison) }</td>
      <td className='prisons__cell'>{ moment(prison.updated_at).format('DD.MM.YYYY, HH:mm:ss') }</td>
      <td className='prisons__cell'>{ prison.place_id !== null ? places[prison.place_id].name : ''}</td>
      <td className='prisons__cell prisons__strength'>
        <span>{ String(prison.max_prisoners).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ') }</span>
      </td>
      <td className='prisons__cell'>{ prison.published.ru ? 'да' : 'нет' }</td>
      <td className='prisons__cell'>{ prison.published.en ? 'да' : 'нет' }</td>
    </tr>
  );
};

export default PrisonRow;
