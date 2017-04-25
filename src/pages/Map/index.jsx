import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { values, isEmpty } from 'ramda';
import { withRouter } from 'react-router-dom';

import Header from './Header';
import Year from './Year';
import InfoCard from './InfoCard';
import ChartButton from './ChartButton';
import Chart from './Chart';
import PrisonCard from './PrisonCard/PrisonCard';
import PeriodCard from './PeriodCard';
import Map from './Map';
import PublicRoute from '../../App/PublicRoute';
import { prisonsToFeatures } from '../../utils/utils';

const ChartWrap = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  pointer-events: none;
  z-index: 1;
`;

class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLanguage: 'ru',
      currentYear: 1918,
      currentPrisons: [],
      prisonCardVisibility: false,
      periodCardVisibility: false,
      infoCardVisibility: false,
      isDemoPlayed: false
    };
    this.demo = this.demo.bind(this);
    this.setYear = this.setYear.bind(this);
    this.openPrisonCard = this.openPrisonCard.bind(this);
    this.openPeriodCard = this.openPeriodCard.bind(this);
    this.toggleInfoCard = this.toggleInfoCard.bind(this);
    this.changeLanguage = this.changeLanguage.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const prisons = values(nextProps.prisons);
    const filteredPrisons = prisons.filter(prison => prison.published[this.state.currentLanguage]);

    this.setState({ currentPrisons: filteredPrisons });
  }

  setYear(year) {
    this.setState({ currentYear: year });
  }

  demo() {
    const { isDemoPlayed } = this.state;
    this.setState({ isDemoPlayed: !isDemoPlayed });

    if (isDemoPlayed) {
      clearInterval(this.playDemo);
    } else {
      this.playDemo = setInterval(() => {
        if (this.state.currentYear < 1960) {
          this.setYear(this.state.currentYear + 1);
        } else clearInterval(this.playDemo);
      }, 1000);
    }
  }

  openPrisonCard(prisonId) {
    this.setState(
      { prisonCardVisibility: true },
      this.props.history.push(`/prison${prisonId}`)
    );
  }

  closePrisonCard() {
    this.setState(
      { prisonCardVisibility: false },
      this.props.history.push('/')
    );
  }

  openPeriodCard(periodId) {
    this.setState({ currentPeriod: periodId }, () => {
      this.props.history.push(`/period${periodId}`);
    });
  }

  closePeriodCard() {
    this.props.history.push('/');
  }

  toggleInfoCard() {
    this.setState({ infoCardVisibility: !this.state.infoCardVisibility });
  }

  changeLanguage({ value }) {
    this.setState({ currentLanguage: value });
  }

  render() {
    const { periods, prisons } = this.props;
    const {
      currentYear, currentPrisons, currentLanguage, isDemoPlayed, infoCardVisibility
    } = this.state;

    const features = prisonsToFeatures(currentPrisons, currentYear);

    const PrisonCardWithRouter = withRouter(({ match }) => (
      <PrisonCard
        visible
        prison={!isEmpty(prisons) && prisons[match.params.prisonId]}
        closeCard={this.closePrisonCard.bind(this)}
        currentLanguage={currentLanguage}
      />
    ));

    const PeriodCardWithRouter = withRouter(({ match }) => (
      <PeriodCard
        visible
        period={!isEmpty(periods) && periods[match.params.periodId]}
        currentLanguage={currentLanguage}
        closeCard={this.closePeriodCard.bind(this)}
      />
    ));

    return (
      <div>
        <Header
          currentYear={currentYear}
          currentPrisons={currentPrisons}
          currentLanguage={currentLanguage}
          openInfoCard={this.toggleInfoCard}
          changeLanguage={this.changeLanguage}
        />
        <Year>{ currentYear }</Year>
        <InfoCard
          visible={infoCardVisibility}
          closeCard={this.toggleInfoCard}
        />
        <ChartWrap>
          <ChartButton
            isDemoPlayed={isDemoPlayed}
            onClick={this.demo}
          />
          <Chart
            periods={periods}
            currentYear={currentYear}
            setYear={this.setYear}
            openPeriod={this.openPeriodCard}
          />
          <ChartButton />
        </ChartWrap>
        <Map
          features={features}
          openCard={this.openPrisonCard}
          currentYear={currentYear}
          slideUp={this.state.prisonCardVisibility}
        />
        <PublicRoute path='/prison:prisonId' component={PrisonCardWithRouter} />
        <PublicRoute path='/period:periodId' component={PeriodCardWithRouter} />
      </div>
    );
  }
}

IndexPage.propTypes = {
  periods: PropTypes.object,
  prisons: PropTypes.object
};

export default withRouter(IndexPage);
