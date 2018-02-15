/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import { getPeriods } from '../../../../utils/utils';

const TD = styled.td`
  padding: 10px 25px 10px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.3);
  &:before {
    content: '';
    display: block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: ${props => (props.published ? '#000' : 'rgba(0,0,0,.1)')};
  }
`;

const PrisonRow = (props) => {
  const {
    prison,
    // places,
    // types,
    openCamp
  } = props;

  return (
    <tr onClick={openCamp.bind(null, prison.get('id'))}>
      <td className='prisons__cell' height='56'>{prison.get('id')}</td>
      <td className='prisons__cell'>{prison.getIn(['name', 'ru'])}</td>
      <td className='prisons__cell prisons__cell_period'>{getPeriods(prison.toJS())}</td>
      <td className='prisons__cell'>
        {
          moment(prison.get('updated_at'))
            .locale('ru')
            .format('DD.MM.YY, HH:mm')
        }
      </td>
      <td className='prisons__cell'>
        {
          // prison.place_id !== null ? places[prison.place_id].name : ''
        }
      </td>
      <td className='prisons__cell'>
        {
          // prison.type_id !== null ? types[prison.type_id].name : ''
        }
      </td>
      <td className='prisons__cell prisons__strength'>
        <span>
          {
            String(prison.get('max_prisoners'))
              .replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')
          }
        </span>
      </td>
      <TD published={prison.getIn(['published', 'ru'])} />
      <TD published={prison.getIn(['published', 'en'])} />
      <TD published={prison.getIn(['published', 'de'])} />
    </tr>
  );
};

PrisonRow.propTypes = {
  prison: PropTypes.shape({
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
  })
  // places: PropTypes.object,
  // types: PropTypes.arrayOf(PropTypes.shape({
  //   id: PropTypes.number,
  //   name: PropTypes.string
  // }))
};

export default PrisonRow;
