import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { browserHistory } from 'react-router';
import { getPeriods } from '../../../utils/utils';

const TD = styled.td`
  padding: 10px 25px 10px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.3);
  &:before {
    content: '';
    display: block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: ${props => props.published ? '#000' : 'rgba(0,0,0,.1)'};
  }
`;

const PrisonRow = (props) => {
  const { prison, places } = props;
  const url = `/admin/prisons/${prison.id}`;
  const openPrison = browserHistory.push.bind(browserHistory, url);
  return (
    <tr onClick={ openPrison }>
      <td className='prisons__cell' height='56'>{prison.name.ru}</td>
      <td className='prisons__cell prisons__cell_period'>{ getPeriods(prison) }</td>
      <td className='prisons__cell'>{ moment(prison.updated_at).locale('ru').format('DD MMM YYYY, HH:mm:ss') }</td>
      <td className='prisons__cell'>{ prison.place_id !== null ? places[prison.place_id].name : ''}</td>
      <td className='prisons__cell prisons__strength'>
        <span>{ String(prison.max_prisoners).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ') }</span>
      </td>
      <TD published={ prison.published.ru }/>
      <TD published={ prison.published.en }/>
      <TD published={ prison.published.de }/>
    </tr>
  );
};

export default PrisonRow;
