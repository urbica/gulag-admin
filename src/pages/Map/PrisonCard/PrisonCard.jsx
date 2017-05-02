import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

import {
  Wrap,
  Top,
  Location,
  Button,
  Left,
  HalfWidth,
  Subtitle,
  MarkdownStyled,
  Right
} from './PrisonCardStyles';
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
        <Location>{getRightLang(prison.additional_names, currentLanguage)}</Location>
        <Button onClick={closeCard}>
          <img src={cross} alt='cross' />
        </Button>
      </Top>
      <Left>
        <HalfWidth>
          <Subtitle>Годы существования</Subtitle>
          <div>{getPeriods(prison)}</div>
        </HalfWidth>
        <HalfWidth>
          <Subtitle>Тип деятельности</Subtitle>
          <div>{prison.activity_id ? activities[prison.activity_id].name : '–––'}</div>
        </HalfWidth>
        <Subtitle>Местоположение</Subtitle>
        <div>{getRightLang(prison.location, currentLanguage)}</div>
        <MarkdownStyled>
          <ReactMarkdown source={getRightLang(prison.description, currentLanguage)} />
        </MarkdownStyled>
      </Left>
      <Right>
        <Subtitle>Количество заключенных по годам</Subtitle>
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
