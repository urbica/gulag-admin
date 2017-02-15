import React, { Component } from 'react'
import { values } from 'ramda'
import Header from './Header'
import Year from './Year'
import PrisonCard from './PrisonCard'
import PeriodCard from './PeriodCard'
import Map from './Map'

class IndexPage extends Component {
  state = {
    currentLanguage: 'ru',
    currentYear: 1918,
    currentPrisons: [],
    currentPeriod: 1,
    prisonCardVisibility: true,
    periodCardVisibility: true
  };

  componentWillReceiveProps(nextProps) {
    const prisons = values(nextProps.prisons);
    const filteredPrisons = prisons.filter(prison => prison.published[this.state.currentLanguage]);

    this.setState({ currentPrisons: filteredPrisons });
  }

  closePrisonCard() {
    this.setState({ prisonCardVisibility: false });
  }

  closePeriodCard() {
    this.setState({ periodCardVisibility: false });
  }

  render() {
    const {
      currentYear, currentPrisons, prisonCardVisibility,
      periodCardVisibility, currentLanguage, currentPeriod
    } = this.state;

    return (
      <div>
        <Header
          currentYear={currentYear}
          currentPrisons={currentPrisons}
        />
        <Year>{ currentYear }</Year>
        {
          this.props.periods &&
          <PeriodCard
            visible={periodCardVisibility}
            period={this.props.periods[currentPeriod]}
            currentLanguage={currentLanguage}
            closeCard={this.closePeriodCard.bind(this)}
          />
        }
        {
          this.props.prisons &&
          <PrisonCard
            visible={prisonCardVisibility}
            prison={currentPrisons[1]}
            currentLanguage={currentLanguage}
            closeCard={this.closePrisonCard.bind(this)}
          />
        }
        <Map/>
      </div>
    )
  }
}

export default IndexPage