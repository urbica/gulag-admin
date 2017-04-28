import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

import { Wrap, Top, Button, Left, Right } from './PrisonCardStyles';
import PrisonChart from './PrisonChart';
import cross from '../cross.svg';
import { getPeriods, getRightLang } from '../../../utils/utils';

const PrisonCard = (props) => {
  const { visible, prison, activities, closeCard, currentLanguage } = props;

  if (!prison) {
    return <Wrap visible={visible}>Загрузка</Wrap>;
  }

  return (
    <Wrap visible={visible}>
      <Top>
        <h1>{getRightLang(prison.name, currentLanguage)}</h1>
        <h2>{getRightLang(prison.additional_names, currentLanguage)}</h2>
        <Button onClick={closeCard}>
          <img src={cross} alt='cross' />
        </Button>
      </Top>
      <Left>
        <div>Годы существования</div>
        <div>{getPeriods(prison)}</div>
        <div>Тип деятельности</div>
        <div>{prison.activity_id ? activities[prison.activity_id].name : '–––'}</div>
        <div>Местоположение</div>
        <div>{getRightLang(prison.location, currentLanguage)}</div>
        <ReactMarkdown source={getRightLang(prison.description, currentLanguage)} />
      </Left>
      <Right>
        <PrisonChart
          features={prison.features}
        />
      </Right>
    </Wrap>
  );
};

PrisonCard.propTypes = {
  visible: PropTypes.bool,
  prison: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ]),
  activities: PropTypes.arrayOf(
    PropTypes.object
  ),
  closeCard: PropTypes.func,
  currentLanguage: PropTypes.string
};

export default PrisonCard;
