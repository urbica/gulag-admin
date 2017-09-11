/* eslint-disable react/no-danger */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import PrisonChart from './PrisonChart';
import Gallery from '../Gallery/Gallery';

// images
import close from '../icons/btn-close.svg';
import preloader from '../icons/preloader.svg';

// utils
import { getPeriods, getRightLang } from '../../../utils/utils';
import parseMd from '../../../utils/parseMD';
import getFirstYear from '../../../utils/prison-utils';

// styled
import Container from './Container';
import Preloader from './Preloader';
import Top from './Top';
import Location from './Location';
import Left from './Left';
import HalfWidth from './HalfWidth';
import Subtitle from './Subtitle';
import MarkdownStyled from './MarkdownStyled';
import Right from './Right';
import { CardButton } from '../StyledButtons';

class PrisonCard extends PureComponent {
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

    const activity = prison.activity_id && activities[prison.activity_id]
      ? activities[prison.activity_id].name
      : '';

    const activityTitle = prison.activity_id && activities[prison.activity_id]
      ? 'Тип деятельности'
      : '';

    if (!prison) {
      return (
        <Container>
          <Preloader src={preloader} alt='preloader' />
        </Container>
      );
    }

    return (
      <Container>
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
            <Subtitle>{activityTitle}</Subtitle>
            <div>{activity}</div>
          </HalfWidth>
          <div>
            <Subtitle>Местоположение</Subtitle>
            <div>{getRightLang(prison.location, currentLanguage)}</div>
          </div>
          <MarkdownStyled>
            <div
              dangerouslySetInnerHTML={
                { __html: parseMd(getRightLang(prison.description, currentLanguage)).description }
              }
            />
          </MarkdownStyled>
        </Left>
        <Right>
          <Subtitle>Количество заключенных по годам</Subtitle>
          <PrisonChart features={prison.features} />
        </Right>
        {
          this.props.photos.length > 0 &&
          <Gallery photos={this.props.photos} />
        }
      </Container>
    );
  }
}

PrisonCard.propTypes = {
  setYear: PropTypes.func.isRequired,
  prison: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ]).isRequired,
  history: PropTypes.object.isRequired,
  activities: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired,
  closeCard: PropTypes.func.isRequired,
  currentLanguage: PropTypes.string.isRequired,
  photos: PropTypes.arrayOf(
    PropTypes.object
  )
};

PrisonCard.defaultProps = {
  photos: []
};

export default withRouter(PrisonCard);
