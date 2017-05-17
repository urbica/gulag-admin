import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { values, isEmpty } from 'ramda';
import { withRouter } from 'react-router-dom';

import Header from './Header/Header';
import SearchCard from './SearchCard/SearchCard';
import Year from './Year';
import InfoCard from './InfoCard/InfoCard';
import PlayButton from './PlayButton';
import Chart from './Chart';
import ShowAllButton from './ShowAllButton';
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
      lastYear: null,
      currentPrisons: [],
      openedPrisonCoordinates: [],
      isDemoPlayed: false
    };
    this.demo = this.demo.bind(this);
    this.setYear = this.setYear.bind(this);
    this.showAllYears = this.showAllYears.bind(this);
    this.openPrisonCard = this.openPrisonCard.bind(this);
    this.openPeriodCard = this.openPeriodCard.bind(this);
    this.openInfoCard = this.openInfoCard.bind(this);
    this.openSearchCard = this.openSearchCard.bind(this);
    this.closeCard = this.closeCard.bind(this);
    this.changeLanguage = this.changeLanguage.bind(this);
    this.showAllPrisons = this.showAllPrisons.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const prisons = values(nextProps.prisons);
    const filteredPrisons = prisons.filter(prison => prison.published[this.state.currentLanguage]);

    this.setState({ currentPrisons: filteredPrisons });

    if (nextProps.location.pathname.match(/^\/prison(\d+)$/)) {
      const prisonId = nextProps.location.pathname.match(/^\/prison(\d+)$/)[1];

      this.setState({
        openedPrisonCoordinates: nextProps.prisons[prisonId].features[0].geometry.coordinates
      });
    }
  }

  setYear(year) {
    if (this.state.currentYear !== year) {
      this.setState({ currentYear: year });
    }
  }

  showAllYears() {
    if (this.state.currentYear !== 'all') {
      this.setState({ lastYear: this.state.currentYear }, () => this.setYear('all'));
    } else this.setYear(this.state.lastYear);
  }

  demo() {
    const { isDemoPlayed } = this.state;
    this.setState({
      currentYear: 1930,
      isDemoPlayed: !isDemoPlayed
    });

    if (isDemoPlayed) {
      clearInterval(this.playDemo);
    } else {
      this.playDemo = setInterval(() => {
        if (this.state.currentYear < 1956) {
          this.setYear(this.state.currentYear + 1);
        } else {
          clearInterval(this.playDemo);
          this.setState({ isDemoPlayed: false, currentYear: 'all' });
        }
      }, 1000);
    }
  }

  openPrisonCard(prisonId) {
    this.props.history.push(`/prison${prisonId}`);
  }

  openPeriodCard(periodId) {
    this.props.history.push(`/period${periodId}`);
  }

  openInfoCard() {
    this.props.history.push('/info');
  }

  openSearchCard() {
    this.props.history.push('/search');
  }

  closeCard() {
    this.props.history.push('/');
  }

  changeLanguage({ value }) {
    this.setState({ currentLanguage: value });
  }

  showAllPrisons() {
    const prisons = values(this.props.prisons);

    const features = prisons.reduce((acc, prison) => {
      const newFeatures = prison.features.reduce((prev, feature) => {
        const newProperties = {
          id: prison.id,
          ruName: prison.name.ru,
          enName: prison.name.en,
          deName: prison.name.de
        };

        return prev.concat([{ ...feature, properties: newProperties }]);
      }, []);
      return acc.concat(newFeatures);
    }, []);

    return features;
  }

  render() {
    const { periods, prisons, activities } = this.props;
    const {
      currentYear, currentPrisons, currentLanguage, isDemoPlayed, openedPrisonCoordinates
    } = this.state;

    const features = (currentYear !== 'all') ? prisonsToFeatures(currentPrisons, currentYear) :
      this.showAllPrisons();

    const InfoCardWithRouter = withRouter(() => (
      <InfoCard
        closeCard={this.closeCard}
        currentLanguage={currentLanguage}
      />
    ));

    const SearchCardWithRouter = withRouter(() => (
      <SearchCard
        prisons={prisons}
        currentLanguage={currentLanguage}
        closeSearchCard={this.closeCard}
      />
    ));

    const PrisonCardWithRouter = withRouter(({ match }) => (
      <PrisonCard
        visible
        prison={!isEmpty(prisons) && prisons[match.params.prisonId]}
        closeCard={this.closeCard}
        setYear={this.setYear}
        currentLanguage={currentLanguage}
        activities={activities}
      />
    ));

    const PeriodCardWithRouter = withRouter(({ match }) => (
      <PeriodCard
        period={!isEmpty(periods) && periods[match.params.periodId]}
        currentLanguage={currentLanguage}
        closeCard={this.closeCard}
      />
    ));

    return (
      <div>
        <Header
          currentYear={currentYear}
          currentLanguage={currentLanguage}
          openInfoCard={this.openInfoCard}
          openSearchCard={this.openSearchCard}
          changeLanguage={this.changeLanguage}
        />
        <Year year={currentYear} />
        <ChartWrap>
          <PlayButton
            isDemoPlayed={isDemoPlayed}
            onClick={this.demo}
          />
          <Chart
            periods={periods}
            currentYear={currentYear}
            setYear={this.setYear}
            openPeriod={this.openPeriodCard}
          />
          <ShowAllButton
            onClick={this.showAllYears}
            showAll={currentYear === 'all'}
          />
        </ChartWrap>
        <Map
          centerCoordinates={openedPrisonCoordinates}
          features={features}
          openCard={this.openPrisonCard}
          currentYear={currentYear}
        />
        <PublicRoute path='/search' component={SearchCardWithRouter} />
        <PublicRoute path='/info' component={InfoCardWithRouter} />
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
