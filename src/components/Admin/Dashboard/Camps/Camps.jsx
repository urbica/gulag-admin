import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
// import { push } from 'react-router-redux';
// import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import './PrisonsTable.css';
// import { getFirstYearInFeatures } from '../../../../utils/utils';

import { changeCampsSortedBy } from '../../../App/uiReducer';

// components
import PrisonRow from './PrisonRow';

// styled
import ColumnHeader from './ColumnHeader';

// const getComparator = (sortBy) => {
//   if (sortBy[0] === 'id') {
//     return (a, b) => {
//       const aId = view(lensPath(sortBy), a);
//       const bId = view(lensPath(sortBy), b);
//       return collator.compare(aId, bId);
//     };
//   } else if (sortBy[0] === 'name') {
//     return (a, b) => {
//       const aName = view(lensPath(sortBy), a);
//       const bName = view(lensPath(sortBy), b);
//       return collator.compare(aName, bName);
//     };
//   } else if (sortBy[0] === 'period') {
//     return comparator((a, b) => {
//       const aFirstYear = getFirstYearInFeatures(a.features);
//       const bFirstYear = getFirstYearInFeatures(b.features);
//       return aFirstYear < bFirstYear;
//     });
//   } else if (sortBy[0] === 'updated_at') {
//     return comparator((a, b) =>
//        new Date(a.updated_at) < new Date(b.updated_at));
//   } else if (sortBy[0] === 'place_id') {
//     return (a, b) => {
//       const aPlaceName = view(lensPath([a.place_id, 'name']), places);
//       const bPlaceName = view(lensPath([b.place_id, 'name']), places);
//       return collator.compare(aPlaceName, bPlaceName);
//     };
//   } else if (sortBy[0] === 'type_id') {
//     return (a, b) => {
//       const aTypesName = view(lensPath([a.type_id, 'name']), types);
//       const bTypesName = view(lensPath([b.type_id, 'name']), types);
//       return collator.compare(aTypesName, bTypesName);
//     };
//   } else if (sortBy[0] === 'max_prisoners') {
//     return comparator((a, b) => a.max_prisoners < b.max_prisoners);
//   } else if (sortBy[0] === 'published') {
//     return comparator((a, b) => {
//       const aPublished = view(lensPath(sortBy), a);
//       const bPublished = view(lensPath(sortBy), b);
//       return aPublished < bPublished;
//     });
//   }
// };

const campsTableHeaders = {
  id: { title: 'Id', path: Immutable.fromJS(['id']) },
  title: { title: 'Название', path: Immutable.fromJS(['title', 'ru']) },
  period: { title: 'Период', path: Immutable.fromJS(['period']) },
  updated_at: { title: 'Ред.', path: Immutable.fromJS(['updated_at']) },
  place: { title: 'Регион', path: Immutable.fromJS(['place_id']) },
  type: { title: 'Тип лагеря', path: Immutable.fromJS(['type_id']) },
  max_prisoners: {
    title: 'Макс. числ.',
    path: Immutable.fromJS(['max_prisoners'])
  },
  ru: { title: 'Рус', path: Immutable.fromJS(['published', 'ru']) },
  en: { title: 'Eng', path: Immutable.fromJS(['published', 'en']) },
  de: { title: 'Deu', path: Immutable.fromJS(['published', 'de']) }
};

const CampsTable = props => {
  const { camps, campsSortBy, campsSortASC, openCamp, dispatch } = props;

  const sortCamps = (a, b) => {
    if (campsSortASC) {
      return a.getIn(campsSortBy) > b.getIn(campsSortBy);
    }
    return a.getIn(campsSortBy) < b.getIn(campsSortBy);
  };

  return (
    <table className='prisons'>
      <thead>
        <tr>
          {Object.keys(campsTableHeaders).map(headerId => (
            <ColumnHeader
              key={headerId}
              isTriangleVisible={campsSortBy.equals(
                campsTableHeaders[headerId].path
              )}
              campsSortASC={campsSortASC}
              onClick={dispatch.bind(
                null,
                changeCampsSortedBy(campsTableHeaders[headerId].path)
              )}
            >
              {campsTableHeaders[headerId].title}
            </ColumnHeader>
          ))}
        </tr>
      </thead>
      <tbody>
        {camps
          .sort(sortCamps)
          .map(camp => (
            <PrisonRow
              key={camp.get('id')}
              camp={camp}
              places={props.places}
              types={props.types}
              openCamp={openCamp}
            />
          ))}
      </tbody>
    </table>
  );
};

CampsTable.propTypes = {
  camps: PropTypes.object.isRequired,
  campsSortASC: PropTypes.bool.isRequired,
  campsSortBy: PropTypes.object.isRequired,
  openCamp: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  places: PropTypes.object.isRequired,
  types: PropTypes.object.isRequired
};

export default connect(state => ({
  campsSortASC: state.getIn(['ui', 'campsSortASC']),
  campsSortBy: state.getIn(['ui', 'campsSortBy'])
}))(CampsTable);
