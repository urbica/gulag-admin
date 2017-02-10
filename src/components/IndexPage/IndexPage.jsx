import React, { Component } from 'react'
import { values } from 'ramda'
import Header from './Header'
import Year from './Year'
import PeriodCard from './PeriodCard'
import Map from './Map'

class IndexPage extends Component {
  state = {
    currentLanguage: 'ru',
    currentYear: 1918,
    currentPrisons: [],
    currentPeriod: 1,
    periodCardVisibility: true
  };

  componentWillReceiveProps(nextProps) {
    const prisons = values(nextProps.prisons);
    const filteredPrisons = prisons.filter(prison => prison.published[this.state.currentLanguage]);

    this.setState({ currentPrisons: filteredPrisons });
  }

  closePeriodCard() {
    this.setState({periodCardVisibility: false});
  }

  render() {
    const {
      currentYear, currentPrisons,
      periodCardVisibility, currentLanguage, currentPeriod
    } = this.state;

    return (
      <div>
        <Header currentYear={ currentYear }
                currentPrisons={ currentPrisons }
        />
        <Year>{ currentYear }</Year>
        <PeriodCard visible={ periodCardVisibility }
                    period={ this.props.periods[currentPeriod] }
                    currentLanguage={ currentLanguage }
                    closeCard={ this.closePeriodCard.bind(this) }
        />
        <Map currentPrisons={ currentPrisons }/>
      </div>
    )
  }
}

export default IndexPage