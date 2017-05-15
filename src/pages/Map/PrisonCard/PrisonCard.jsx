import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
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
import { getFirstYear } from '../../../utils/prison-utils';

class PrisonCard extends Component {
  componentDidMount() {
    console.log(this.props);

    const { prison, setYear } = this.props;

    if (prison) {
      const year = getFirstYear(prison);
      setYear(year);
    }
  }

  render() {
    const { visible, prison, activities, closeCard, currentLanguage } = this.props;

    if (!prison) {
      return <Wrap visible={visible}>Загрузка</Wrap>;
    }

    const activity = prison.activity_id && activities[prison.activity_id]
      ? activities[prison.activity_id].name
      : '–––';

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
            <div>{ activity }</div>
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
  }
}

PrisonCard.propTypes = {
  setYear: PropTypes.func,
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

export default withRouter(PrisonCard);
