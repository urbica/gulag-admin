import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import {
  Wrap,
  Top,
  Location,
  Left,
  HalfWidth,
  Subtitle,
  MarkdownStyled,
  Right
} from './PrisonCardStyles';
import { CardButton } from '../StyledButtons';
import PrisonChart from './PrisonChart';
import close from '../icons/btn-close.svg';
import { getPeriods, getRightLang } from '../../../utils/utils';
import { getFirstYear } from '../../../utils/prison-utils';

class PrisonCard extends Component {
  componentDidMount() {
    const { prison, setYear, history } = this.props;

    // set currentYear to prison first year
    // if component is loaded with POP action
    if (prison && history.action === 'POP') {
      const year = getFirstYear(prison);
      setYear(year);
    }
  }

  render() {
    const { prison, activities, closeCard, currentLanguage } = this.props;

    if (!prison) {
      return <Wrap>Загрузка</Wrap>;
    }

    const activity = prison.activity_id && activities[prison.activity_id]
      ? activities[prison.activity_id].name
      : '';

    const activityTitle = prison.activity_id && activities[prison.activity_id]
      ? 'Тип деятельности'
      : '';

    return (
      <Wrap>
        <Top>
          <h1>{getRightLang(prison.name, currentLanguage)}</h1>
          <Location>{getRightLang(prison.additional_names, currentLanguage)}</Location>
          <CardButton onClick={closeCard}>
            <img src={close} alt='cross' />
          </CardButton>
        </Top>
        <Left>
          <HalfWidth>
            <Subtitle>Годы существования</Subtitle>
            <div>{getPeriods(prison)}</div>
          </HalfWidth>
          <HalfWidth>
            <Subtitle>{ activityTitle }</Subtitle>
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
