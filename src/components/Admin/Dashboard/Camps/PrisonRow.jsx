import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { getPeriods } from '../../../../utils/utils';

// styled
import PrisonLangMark from './PrisonLangMark';

const PrisonRow = ({ camp, places, types, openCamp }) => (
  <tr onClick={openCamp.bind(null, camp.get('id'))}>
    <td className='prisons__cell' height='56'>
      {camp.get('id')}
    </td>
    <td
      className={`prisons__cell ${
        Boolean(camp.get('notes')) === true ? 'prisons__flag' : ''
      }`}
    >
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
    <PrisonLangMark published={camp.getIn(['published', 'ru'])} />
    <PrisonLangMark published={camp.getIn(['published', 'en'])} />
    <PrisonLangMark published={camp.getIn(['published', 'de'])} />
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
