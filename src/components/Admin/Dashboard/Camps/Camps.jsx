import React from 'react';
import Immutable from 'immutable';
import PropTypes from 'prop-types';

import { changeCampsSortedBy } from '../../../App/uiReducer';

// components
import PrisonRow from './PrisonRow';

// styled
import './PrisonsTable.css';
import ColumnHeader from './styled/ColumnHeader';

const campsTableHeaders = {
  id: { title: 'Id', path: Immutable.fromJS(['id']) },
  title: { title: 'Название', path: Immutable.fromJS(['title', 'ru']) },
  period: { title: 'Период', path: Immutable.fromJS(['period']) },
  updatedAt: { title: 'Ред.', path: Immutable.fromJS(['updatedAt']) },
  region: { title: 'Регион', path: Immutable.fromJS(['regionId']) },
  type: { title: 'Тип лагеря', path: Immutable.fromJS(['typeId']) },
  max_prisoners: {
    title: 'Макс. числ.',
    path: Immutable.fromJS(['max_prisoners'])
  },
  ru: { title: 'Рус', path: Immutable.fromJS(['published', 'ru']) },
  en: { title: 'Eng', path: Immutable.fromJS(['published', 'en']) },
  de: { title: 'Deu', path: Immutable.fromJS(['published', 'de']) }
};

const Camps = ({
  filteredCamps,
  campsSortBy,
  campsSortASC,
  openCamp,
  dispatch,
  places,
  types
}) => {
  // TODO: move sort to selector
  const sortCamps = (a, b) => {
    if (!campsSortASC) {
      if (a.getIn(campsSortBy) > b.getIn(campsSortBy)) return -1;
      if (a.getIn(campsSortBy) < b.getIn(campsSortBy)) return 1;
      return 0;
    }
    if (a.getIn(campsSortBy) < b.getIn(campsSortBy)) return -1;
    if (a.getIn(campsSortBy) > b.getIn(campsSortBy)) return 1;
    return 0;
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
        {filteredCamps.sort(sortCamps).map(camp => (
          <PrisonRow
            key={camp.get('id')}
            camp={camp}
            places={places}
            types={types}
            openCamp={openCamp}
          />
        ))}
      </tbody>
    </table>
  );
};

Camps.propTypes = {
  filteredCamps: PropTypes.object.isRequired,
  campsSortASC: PropTypes.bool.isRequired,
  campsSortBy: PropTypes.object.isRequired,
  openCamp: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  places: PropTypes.object.isRequired,
  types: PropTypes.object.isRequired
};

export default Camps;
