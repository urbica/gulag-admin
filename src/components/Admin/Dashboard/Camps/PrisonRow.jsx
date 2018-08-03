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
    background-color: ${({ published }) =>
      published ? '#000' : 'rgba(0,0,0,.1)'};
  }
`;

const PrisonRow = ({ camp, places, types, openCamp }) => (
  <tr onClick={openCamp.bind(null, camp.get('id'))}>
    <td className='prisons__cell' height='56'>
      {camp.get('id')}
    </td>
    <td className='prisons__cell'>
      {camp.getIn(['title', 'ru'])}
    </td>
    <td className='prisons__cell prisons__cell_period'>
      {getPeriods(camp.get('locations'))}
    </td>
    <td className='prisons__cell'>
      {moment(camp.get('updatedAt'))
          .locale('ru')
          .format('DD.MM.YY, HH:mm')}
    </td>
    <td className='prisons__cell'>
      {places.getIn([camp.get('regionId'), 'title', 'ru'])}
    </td>
    <td className='prisons__cell'>
      {types.getIn([camp.get('typeId'), 'title', 'ru'])}
    </td>
    <td className='prisons__cell prisons__strength'>
      <span>
        {String(camp.get('max_prisoners')).replace(
            /(\d)(?=(\d{3})+([^\d]|$))/g,
            '$1\u00A0'
          )}
      </span>
    </td>
    <TD published={camp.getIn(['published', 'ru'])} />
    <TD published={camp.getIn(['published', 'en'])} />
    <TD published={camp.getIn(['published', 'de'])} />
  </tr>
);

PrisonRow.propTypes = {
  camp: PropTypes.shape({
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
  }).isRequired,
  places: PropTypes.object.isRequired,
  types: PropTypes.object.isRequired,
  openCamp: PropTypes.func.isRequired
};

export default PrisonRow;
